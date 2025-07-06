import axios from 'axios';
import { createUser, getUserByOpenid } from '../services/user.service.js';
import dayjs from 'dayjs';
import { generateToken } from '../utils/jwt.util.js';
import chalk from 'chalk';
import getVersionList from '../utils/wechat/getVersionList.util.js';
/**
 * 小程序登录
 * @param code
 * @returns {Promise<any>}
 * @url https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html
 */
const code2Session = async (code) => {
  try {
    const params = {
      appid: process.env.MINI_PROGRAM_APPID,
      secret: process.env.MINI_PROGRAM_APPSECRET,
      js_code: code,
      grant_type: 'authorization_code',
    };
    const {data} = await axios({
      method: 'get',
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      params,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      },
    });

    return data;
  } catch (e) {
    console.log(chalk.red(e.message));
    return null;
  }
};

export const miniLogin = async (req, res) => {
  try {
    if (req.headers['content-type'] !== 'application/json') {
      return res.send({
        code: 4000,
        msg: 'content-type只能为application/json',
      });
    }

    const { code } = req.body;

    if (!code) {
      return res.send({
        code: 4000,
        msg: 'code不能为空',
      });
    }
    const { openid, session_key } = await code2Session(code);
    console.log(openid)
    let info = null;
    info = await getUserByOpenid(openid);
    if (!info) {
      info = await createUser({ openid, nickname: '剑客无名', avatar: '' });
    }

    const timestamp = info.create_time;
    const now = dayjs();
    let days = now.diff(timestamp*1000, 'day') + 1;

    // 生成包含用户openid的JWT token
    const token = generateToken({ id: info._id, openid, role: info.role });
    const userInfo = {
      nickname: info.nickname,
      avatar: info.avatar,
      days,
    };
    res.send({
      code: 2000,
      data: {
        token,
        openid,
        userInfo,
      },
      msg: '登录成功',
    });
  } catch (e) {
    res.send({
      code: 5000,
      msg: e.message,
    });
  }
};


export const getVersion = async (req,res)=>{
  const data =  await getVersionList();
  return res.send({
    code: 2000,
    data: data,
    msg: 'success'
  })
}