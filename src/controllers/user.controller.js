import { dateDiff } from '../utils/index.js';
import chalk from 'chalk';
import dayjs from 'dayjs';
import {
  getUserInfo,
  registerUser,
  updateUser,
} from '../services/user.service.js';
import { deleteVercelBlob } from './upload.controller.js';

// 用户注册
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: '用户名或密码不能为空' });
    }
    await registerUser(username, password);
    res.status(201).json({ message: '用户注册成功' });
  } catch (error) {
    if (error.message === '用户名或邮箱已被使用') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: '服务器错误', error: error.message });
    }
  }
};

/**
 * 查看个人资料
 */
export const viewProfile = async (req, res) => {
  try {
    const info = await getUserInfo(req.user);


    let days = dateDiff(info.create_time, dayjs());

    const userInfo = {
      nickname: info.nickname,
      avatar: info.avatar,
      days,
    };

    res.send({
      code: 2000,
      data: {
        userInfo: userInfo,
        openid:req.user.openid || undefined
      },
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    res.status(500).send({
      code: 500,
      message: `服务器内部错误${error.message}`,
    });
  }
};
/**
 * 修改个人资料
 */
export const updateProfile = async (req, res) => {

  try {
    const { nickname, avatar } = req.body;
    const info = await getUserInfo(req.user);

    const params = {
      nickname,
      avatar,
    };
    if (info.avatar && info.avatar !== avatar) {
      await deleteVercelBlob(info.avatar);
    }

    const userInfo = await updateUser(info.id, params);

    res.send({
      code: 2000,
      data: {
        userInfo,
      },
    });
  } catch (error) {}
};
