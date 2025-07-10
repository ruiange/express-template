import { del, put } from '@vercel/blob';
import {
  deleteBlobService,
  qiNiuUpload,
  r2Upload,
  vercelBlobUpload,
} from '../services/upload.service.js';

/**
 * 文件上传控制器
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const uploadController = async (req, res) => {
  try {
    const file = req.file;
    const path = req.body.path || 'default';
    const upType = req.body.upType || 'vercel';

    if (!file) {
      return res.status(400).json({ error: '请选择要上传的文件' });
    }

    let url = null;
    if (upType === 'vercel') {
      url = await vercelBlobUpload(file, path);
    }
    if (upType === 'qiniu') {
      url = await qiNiuUpload(file, path);
    }

    if (upType === 'r2') {
      url = await r2Upload(file, path);
    }

    res.send({
      data: {
        url,
      },
      code: 2000,
      msg: '上传成功',
    });
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

/**
 * 文件删除控制器
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteController = async (req, res) => {
  try {
    const filePath = req.body.filePath || null;

    if (!filePath) {
      return res.status(400).json({ error: '请选择要删除的文件' });
    }

    await deleteBlobService(filePath);

    res.send({
      data: null,
      code: 2000,
      msg: '删除成功',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '删除失败' });
  }
};
