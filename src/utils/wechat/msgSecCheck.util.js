import getStableAccessToken from './getStableAccessToken.util.js';
import axios from 'axios';

/**
 * 文本内容安全识别
 * @see https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/msgSecCheck.html
 *
 */
const msgSecCheck = async (content, openid) => {
  const ACCESS_TOKEN = await getStableAccessToken();
  const url = `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${ACCESS_TOKEN}`;
  const { data } = await axios({
    method: 'post',
    url,
    data: {
      openid: openid,
      scene: 1,
      version: 2,
      content: content,
    },
  });
  console.log(data)
  if ('result' in data) {
    return data.result.suggest === 'pass';
  } else {
    return false;
  }
};

export default msgSecCheck;
