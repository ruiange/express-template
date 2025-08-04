import axios from 'axios';
import { douyinTable } from '../db/schema.js';
import { db } from '../config/db.js';
import { eq } from 'drizzle-orm';

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
    const params = {
      jsonData: jsonData,
    };
    const result = await db.insert(douyinTable).values(params).returning({ id: douyinTable.id });
    return result[0]?.id;
  } catch (e) {
    return null;
  }
};

export const getVideoData = async (id) => {
  const rows = await db
    .select() // 默认选中所有字段；也可以 `.select({ jsonData: douyinTable.jsonData })`
    .from(douyinTable)
    .where(eq(douyinTable.id, id))
    .limit(1); // 可选：只取第一条，避免拿多行

  return rows[0]; // 没查到就是 undefined
};

export const getDouyinDataListService = async (page) => {
  return db
    .select() // 默认选中所有字段；也可以 `.select({ jsonData: douyinTable.jsonData })`
    .from(douyinTable)
    .where()
    .limit(10)
    .offset(page * 10);
};
