import { JSDOM } from 'jsdom'; // 导入 JSDOM 库，用于解析 HTML
import axios from 'axios'; // 导入 axios 库，用于发送 HTTP 请求

/**
 * 定义一个异步函数 scanNewsService，用于抓取新闻信息
 * @param pageNum 页码，默认为 0
 * @returns {Promise<*[]>}
 */
export const scanNewsService = async (pageNum = 0) => {
  let jiuYinUrl = 'https://9yin.woniu.com/news/sysnotice'; // 定义要抓取的新闻页面 URL

  if (pageNum > 0) {
    jiuYinUrl = `${jiuYinUrl}/list_${pageNum}.html`;
  }

  // 使用 axios 发送 GET 请求获取 HTML 内容
  const { data: html } = await axios({
    method: 'get', // 请求方法为 GET
    url: jiuYinUrl, // 请求的 URL
    headers: {
      // 设置请求头，模拟浏览器访问
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
  });

  // 使用 JSDOM 解析获取到的 HTML 内容
  const dom = new JSDOM(html);
  const document = dom.window.document; // 获取解析后的文档对象

  // 选择包含新闻列表的容器元素
  const newsList = document.querySelector('.newsListModCont');

  // 获取所有新闻列表项
  const newsItems = newsList.querySelectorAll('.newsListItem');

  console.log(newsItems); // 打印抓取到的新闻列表项，用于调试

  const result = []; // 初始化一个数组，用于存储处理后的新闻信息

  // 遍历每个新闻列表项
  newsItems.forEach((item) => {
    const link = item.querySelector('a'); // 获取新闻链接元素
    const time = item.querySelector('.newsListItemTime'); // 获取新闻发布时间元素

    const url = link?.href || ''; // 获取新闻链接的 href 属性，如果没有则为空字符串
    let id = ''; // 初始化新闻 ID

    // 使用正则表达式从 URL 中提取新闻 ID（假设 URL 格式为 /数字.html）
    const match = url.match(/\/(\d+)\.html$/);
    if (match) {
      id = match[1]; // 提取到的数字作为唯一标识
    }

    // 将处理后的新闻信息推入结果数组
    result.push({
      newsId: id, // 新闻唯一标识
      title: link?.textContent.trim() || '', // 新闻标题，去除前后空格
      url, // 新闻链接
      time: time?.textContent.trim() || '', // 新闻发布时间，去除前后空格
    });
  });
  console.log(result);
  return result; // 返回处理后的新闻信息数组
};
