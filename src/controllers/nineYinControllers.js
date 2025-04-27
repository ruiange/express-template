import axios from 'axios';

/**
 * @description 九阴真经新闻爬虫
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const scanNews = async (req, res) => {
  const jiuYinUrl = 'https://9yin.woniu.com/news/sysnotice';

  const { data } = await axios({
    method: 'get',
    url: jiuYinUrl,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
  });
  res.send({
    code: 2000,
    data: '',
    msg: 'success',
  });
};
