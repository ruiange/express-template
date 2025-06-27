import { douyinService, getVideoData, saveVideoData } from '../services/douyin.service.js';

export const analysisVideo = async (req, res) => {
  const { url } = req.body || {};
  if (!url) {
    return res.send({
      code: 4000,
      msg: 'url is required',
    });
  }
  const data = await douyinService(url, true);
  res.send({
    code: 2000,
    msg: '解析成功',
    data: data,
  });
};

export const saveVideoDataController = async (req, res) => {
  const jsonData = req.body || null;
  if (!jsonData) {
    return res.send({
      code: 4000,
      msg: '参数错误',
    });
  }
  const resData = await saveVideoData(jsonData);
  console.log(resData);
  res.send({
    code: 2000,
    msg: '保存成功',
    data: resData,
  });
};

export const getVideoDataController = async (req, res) => {
  const id = req.query.id ? parseInt(req.query.id) : null;
  console.log(id, 'id');
  if (!id) {
    return res.send({
      code: 4000,
      msg: '参数错误',
    });
  }
  const resData = await getVideoData(id);
  res.send({
    code: 2000,
    msg: '获取成功',
    data: resData,
  });
};
