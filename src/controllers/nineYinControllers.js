import axios from 'axios';
import { JSDOM } from 'jsdom';

export const scanNews = async (req, res) => {
  const jiuYinUrl = 'https://9yin.woniu.com/news/sysnotice';

  const { data: html } = await axios({
    method: 'get',
    url: jiuYinUrl,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
  });
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // 找到新闻列表容器
  const newsList = document.querySelector('.newsListModCont');

  // 遍历里面的每一条新闻项
  const newsItems = newsList.querySelectorAll('.newsListItem');

  console.log(newsItems);

  const result = [];

  newsItems.forEach((item) => {
    const link = item.querySelector('a');
    const time = item.querySelector('.newsListItemTime');

    const url = link?.href || '';
    let id = '';

    // 提取 URL 最后数字
    const match = url.match(/\/(\d+)\.html$/);
    if (match) {
      id = match[1]; // 提取到的数字作为唯一标识
    }

    result.push({
      newsId: id, // 唯一标识
      title: link?.textContent.trim() || '',
      url,
      time: time?.textContent.trim() || '',
    });
  });

  res.send({
    code: 2000,
    data: result,
    msg: 'success',
  });
};
