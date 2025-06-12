import { douyinService } from '../services/douyin.service.js';

export const analysisVideo = async (req, res) => {
  const { url } = req.body || {};
  if (!url) {
    return res.send({
      code: 4000,
      msg: 'url is required',
    });
  }
  const data = await douyinService(url, false);
  res.send({
    code: 2000,
    msg: 'success',
    data: data,
  });
};
