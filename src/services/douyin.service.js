import axios from 'axios';
import Douyin from '../models/douyin.model.js';

export const douyinService = async (str, minimal = false) => {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = str.match(urlRegex);

  // 输出提取的网址
  if (urls) {
    console.log('提取到的网址:', urls);
  } else {
    console.log('未找到网址');
    return {
      code: 500,
      message: '未找到网址',
    };
  }

  const url = encodeURIComponent(urls[0]);
  const douyinUrl = `${process.env.DY_URL}/api/hybrid/video_data?url=${url}&minimal=${minimal}`;
  const { data } = await axios({
    method: 'get',
    url: douyinUrl,
  });
  return data.data || {};
};

export const saveVideoData = async (jsonData) => {
  try {
    const douyin = new Douyin({
      jsonData: jsonData,
    });
    const result = await douyin.save();
    return result._id;
  } catch (e) {
    return null;
  }
};

export const getVideoData = async (id) => {
  try {
    return await Douyin.findById(id, { __v: 0 });
  } catch (e) {
    console.error('获取视频数据失败:', e);
    return null;
  }
};

export const getDouyinDataListService = async (page) => {
  return Douyin.find()
    .limit(10)
    .skip(page * 10)
    .sort({ createdAt: -1 });
};