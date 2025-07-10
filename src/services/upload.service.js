import { put } from '@vercel/blob';
import qiniu from 'qiniu';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import s3CompatibleClient from '../utils/S3Client.util.js';

dotenv.config();

/**
 * Vercel Blob 上传
 * @param file
 * @param path
 * @returns {Promise<string>}
 */
export const vercelBlobUpload = async (file, path) => {
  const filepath = `${path}/${file.originalname}`;
  const { url, downloadUrl, pathname, contentType, contentDisposition } = await put(
    filepath,
    file.buffer,
    {
      access: 'public', // or 'private'
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }
  );
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
 * @returns {Promise<string>}
 */
export const r2Upload = async (file, path) => {
  const key = `${path}/${file.originalname}`;
  const bucketName = 'cloud-disk';
  try {
    await s3CompatibleClient.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    return `${process.env.R2_PUBLIC_URL}/${bucketName}/${key}`;
  } catch (error) {
    console.error('[R2 上传错误]', error);
    throw error;
  }
};
