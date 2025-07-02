import { put } from '@vercel/blob';
import qiniu from 'qiniu';
import { v4 as uuidv4 } from 'uuid';

const vercelBlobUpload = async (file) => {
  const filepath = `zhou/${file.originalname}`;
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

const qiNiuUpload = async (file, path) => {
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

export const uploadController = async (req, res) => {
  try {
    const file = req.file;
    const path = req.body.path || 'default';
    const url = await vercelBlobUpload(file);
    //const url = await qiNiuUpload(file, path);
    res.json({ url: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '上传失败' });
  }
};
