import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import getStableAccessToken from './getStableAccessToken.util.js';

const getUnlimitedQRCode = async (page, scene) => {
  const NODE_ENV = process.env.NODE_ENV;

  let env_version = 'release';
  if (NODE_ENV === 'development') {
    env_version = 'develop';
  }

  console.log(process.env)

  try {
    // 生成唯一的scene值作为登录会话标识 6位数的UUID

    console.log(env_version)
    const access_token = await getStableAccessToken();
    // 调用微信接口生成小程序码
    const response = await axios({
      method: 'post',
      url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
      data: {
        scene,
        page: page || 'pages/login/scan',
        check_path: false,
        env_version,
      },
      responseType: 'arraybuffer',
    });
    //返回scene和二维码
    return response.data.toString('base64');
  } catch (error) {
    return null;
  }
};
export default getUnlimitedQRCode;
