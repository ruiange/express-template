import { put, del } from '@vercel/blob';
import qiniu from 'qiniu';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import s3CompatibleClient from '../utils/S3Client.util.js';
import { recordFileResource } from './fileResources.service.js';
import chalk from 'chalk';
dotenv.config();

/**
 * Vercel Blob 上传
 * @param file
 * @param path
 * @returns {Promise<string>}
 */
export const vercelBlobUpload = async (file, path) => {
  const uniqueId = uuidv4();
  const filepath = `${path}/${uniqueId}.${file.originalname.split('.')[1]}`;
  const { url, downloadUrl, pathname, contentType, contentDisposition } = await put(
    filepath,
    file.buffer,
    {
      access: 'public', // or 'private'
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }
  );

  if (path.includes('/avatar/')) {
    // 头像文件不需要记录
    return url;
  }

  // 记录文件资源
  try {
    await recordFileResource({
      fileName: file.originalname,
      fileUrl: url,
      fileKey: pathname,
      fileSize: file.size,
      mimeType: file.mimetype,
      storageProvider: 'vercel',
      storagePath: filepath,
    });
  } catch (error) {
    console.warn('[Vercel文件资源记录失败]', error.message);
  }

  return url;
};

/**
 * 七牛云上传
 * @param file
 * @param path
 * @returns {Promise<unknown>}
 */
export const qiNiuUpload = async (file, path) => {
  const accessKey = process.env.QINIU_ACCESS_KEY;
  const secretKey = process.env.QINIU_SECRET_KEY;
  const bucket = process.env.QINIU_BUCKET_NAME;
  const domain = process.env.QINIU_BUCKET_DOMAIN;
  const pathPrefix = process.env.QINIU_PATH_PREFIX;
  // 创建上传凭证
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: bucket,
    expires: 3600,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  // 配置上传器
  const config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z0; // 根据你 bucket 的区域来设置

  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  return new Promise((resolve, reject) => {
    // 可以传 mimeType 确保图片类型正确
    putExtra.mimeType = file.mimetype;
    const uniqueId = uuidv4();
    const key = `${pathPrefix}/${path}/${uniqueId}.${file.originalname.split('.')[1]}`; //上传路径
    console.log(key, '上传路径');
    const buffer = file.buffer;
    formUploader.put(uploadToken, key, buffer, putExtra, (err, body, info) => {
      if (err) return reject(err);
      if (info.statusCode === 200) {
        console.log(body, '上传成功');
        const url = `${domain}/${body.key}`;

        // 记录文件资源
        try {
          recordFileResource({
            fileName: file.originalname,
            fileUrl: url,
            fileKey: body.key,
            fileSize: file.size,
            mimeType: file.mimetype,
            storageProvider: 'qiniu',
            storagePath: key,
          }).catch((error) => {
            console.warn('[七牛文件资源记录失败]', error.message);
          });
        } catch (error) {
          console.warn('[七牛文件资源记录失败]', error.message);
        }

        resolve(url);
      } else {
        reject({ status: info.statusCode, body });
      }
    });
  });
};

/**
 * R2 上传
 * @param file
 * @param path
 * @returns {Promise<{url: string, key: string}>}
 */
export const r2Upload = async (file, path) => {
  const uniqueId = uuidv4();
  const key = `${path}/${uniqueId}.${file.originalname.split('.')[1]}`;
  const bucketName = process.env.R2_BUCKET_NAME;

  try {
    // 上传文件到R2
    await s3CompatibleClient.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const url = `${process.env.R2_PUBLIC_URL}/${key}`;
    console.log(chalk.green(`[R2 上传成功url] ${url}`));
    console.log(chalk.green(`[R2 上传成功key] ${key}`));

    // 记录文件资源
    try {
      await recordFileResource({
        fileName: file.originalname,
        fileUrl: url,
        fileKey: key,
        fileSize: file.size,
        mimeType: file.mimetype,
        storageProvider: 'r2',
        storagePath: key,
      });
    } catch (error) {
      console.warn('[R2文件资源记录失败]', error.message);
    }

    return { url, key };
  } catch (error) {
    console.error('[R2 上传错误]', error);
    throw error;
  }
};

/**
 * 文件存储介质判断
 * @param filePath
 */
const storageMediumJudgment = (filePath) => {
  if (filePath.includes('vercel-storage.com')) {
    return 'vercel';
  }
  if (filePath.includes(process.env.QINIU_BUCKET_DOMAIN)) {
    return 'qiniu';
  }
  if (filePath.includes(process.env.R2_PUBLIC_URL)) {
    return 'r2';
  }
  return 'unknown';
};

/**
 * 删除文件
 * @param filePath
 * @param fileKey - 文件key（可选，用于R2和七牛云）
 * @returns {Promise<boolean>}
 */
export const deleteBlobService = async (filePath, fileKey = null) => {
  const medium = storageMediumJudgment(filePath);

  try {
    switch (medium) {
      case 'vercel':
        return await deleteVercelBlob(filePath);
      case 'qiniu':
        return await deleteQiNiuFile(fileKey || extractKeyFromUrl(filePath, 'qiniu'));
      case 'r2':
        return await deleteR2File(fileKey || extractKeyFromUrl(filePath, 'r2'));
      default:
        console.warn(`[删除文件] 未知的存储介质: ${medium}`);
        return false;
    }
  } catch (error) {
    console.error('[删除文件失败]', error);
    return false;
  }
};

/**
 * 从URL中提取文件key
 * @param {string} url - 文件URL
 * @param {string} provider - 存储提供商
 * @returns {string} 文件key
 */
const extractKeyFromUrl = (url, provider) => {
  try {
    const urlObj = new URL(url);
    switch (provider) {
      case 'qiniu':
        return urlObj.pathname.slice(1); // 移除开头的 /
      case 'r2':
        // R2 URL格式: https://domain/bucket/key
        const pathParts = urlObj.pathname.split('/');
        return pathParts.slice(2).join('/'); // 移除 /bucket 部分
      default:
        return urlObj.pathname.slice(1);
    }
  } catch (error) {
    console.error('[提取文件key失败]', error);
    return '';
  }
};

/**
 * 删除七牛云文件
 * @param {string} key - 文件key
 * @returns {Promise<boolean>}
 */
export const deleteQiNiuFile = async (key) => {
  try {
    const accessKey = process.env.QINIU_ACCESS_KEY;
    const secretKey = process.env.QINIU_SECRET_KEY;
    const bucket = process.env.QINIU_BUCKET_NAME;

    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;

    const bucketManager = new qiniu.rs.BucketManager(mac, config);

    return new Promise((resolve) => {
      bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
        if (err) {
          console.error('[七牛云删除失败]', err);
          resolve(false);
        } else if (respInfo.statusCode === 200) {
          console.log(chalk.green(`[七牛云删除成功] ${key}`));
          resolve(true);
        } else {
          console.error('[七牛云删除失败]', respInfo.statusCode, respBody);
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error('[七牛云删除错误]', error);
    return false;
  }
};

/**
 * 删除R2文件
 * @param {string} key - 文件key
 * @returns {Promise<boolean>}
 */
export const deleteR2File = async (key) => {};

export const deleteVercelBlob = async (filePath) => {
  console.log(filePath, 'filePath');
  const pathname = new URL(filePath).pathname.slice(1);
  console.log(pathname, 'pathname');
  try {
    await del(pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return true;
  } catch (error) {
    return false;
  }
};
