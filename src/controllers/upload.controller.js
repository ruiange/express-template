import { del, put } from '@vercel/blob';
import { qiNiuUpload, r2Upload, vercelBlobUpload } from '../services/upload.service.js';

/**
 * 文件上传控制器
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const uploadController = async (req, res) => {
  try {
    const file = req.file;
    const path = req.body.path || 'default';
    const upType = req.body.upType || 'vercel';

    let url = null;
    if (upType === 'vercel') {
      await vercelBlobUpload(file, path);
    }
    if (upType === 'qiniu') {
      url = await qiNiuUpload(file, path);
    }

    if(upType==='r2'){
      r2Upload()
    }

    res.json({ url: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '上传失败' });
  }
};

export const deleteVercelBlob = async (filePath) => {
  const pathname = new URL(filePath).pathname.slice(1);

  try {
    await del(pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return true;
  } catch (error) {
    return false;
  }
};
