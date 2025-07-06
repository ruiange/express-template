import axios from 'axios';
import getStableAccessToken from './getStableAccessToken.util.js';
/**
 * 获取客户端版本
 * @url https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/operation/getVersionList.html
 */
export const getVersionList = async () => {
  const access_token = await getStableAccessToken();

  const {data} = await axios({
    method: 'get',
    url: `https://api.weixin.qq.com/wxaapi/log/get_client_version?access_token=${access_token}`,
  })
  return data;
}

export default getVersionList;