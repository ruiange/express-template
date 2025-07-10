import { put } from '@vercel/blob';
import qiniu from 'qiniu';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

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
  const r2 = await new S3Client({
    region: 'auto',
    endpoint: 'https://f63af00ee8a3d6faa782b6ce83b11120.r2.cloudflarestorage.com', // 你的 R2 endpoint
    credentials: {
      accessKeyId: '2983257bc762700d9a2a67435aa6b20b',
      secretAccessKey: '422b93761fbc60bfbd23927ee5c167f2c0230ce57442981403200079f43a68a6',
    },
  });
  const key = `${path}/${file.originalname}`;
  const bucketName = 'hono-file';
  try {
    await r2.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    return `https://f63af00ee8a3d6faa782b6ce83b11120.r2.cloudflarestorage.com/${bucketName}/${key}`;
  } catch (error) {
    console.error('[R2 上传错误]', error);
    throw error;
  }
};
