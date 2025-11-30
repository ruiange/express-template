import axios from 'axios';
import Douyin from '../models/douyin.model.js';

export const douyinService = async (str) => {
  const urlRegex = /https?:\/\/\S+/g;
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
  const douyinUrl = `${process.env.DY_URL}/Analysis?dy_url=${url}`;
  const { data } = await axios({
    method: 'get',
    url: douyinUrl,
  });
  return data.dy_data || {};
};

export const saveVideoData = async (jsonData) => {
  try {
    const douyin = new Douyin({
      jsonData: jsonData,
    });
    const result = await douyin.save();
    return result._id;
  } catch (e) {
    console.error('保存视频数据失败:', e);
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
  try {
    const limit = 10;
    const skip = page * limit;
    // 按创建时间倒序排列
    return await Douyin.find().limit(limit).skip(skip).sort({ createdAt: -1 });
  } catch (e) {
    console.error('获取抖音数据列表失败:', e);
    return [];
  }
};
