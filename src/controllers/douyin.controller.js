import { douyinService } from '../services/douyin.service.js';

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
