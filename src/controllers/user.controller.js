import { dateDiff } from '../utils/index.js';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { getUserInfo, registerUser, updateUser } from '../services/user.service.js';
import AuthService from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.util.js';
import { deleteBlobService } from '../services/upload.service.js';
import msgSecCheck from '../utils/wechat/msgSecCheck.util.js';

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

    info.days = dateDiff(info.createTime, dayjs());

    const userInfo = info;
    console.log(userInfo);

    res.send({
      code: 2000,
      data: {
        role: info.role,
        userInfo: userInfo,
        openid: req.user.openid || undefined,
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
    const { nickname, avatar, bio, signature } = req.body;
    const info = await getUserInfo(req.user);
    const { openid } = req.user;
    if (!info) {
      return res.status(500).send({
        code: 500,
        message: `用户不存在`,
      });
    }

    const params = {
      nickname,
      avatar,
      bio,
      signature,
    };

    const nickNameCheck = await msgSecCheck(nickname, openid);
    const bioCheck = await msgSecCheck(bio, openid);
    const signatureCheck = await msgSecCheck(signature, openid);

    if (!nickNameCheck && nickname) {
      params.nickname = '刺客无名';
    }
    if (!bioCheck && bio) {
      params.bio = '这个人很懒，什么都没有留下';
    }
    if (!signatureCheck && signature) {
      params.signature = '这个人很懒，什么都没有留下';
    }

    if (info.avatar && info.avatar !== avatar) {
      console.log(chalk.red('删除旧头像'));
      await deleteBlobService(info.avatar);
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

/**
 * 生成管理后台登录二维码
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const generateLoginQrcode = async (req, res) => {
  //const { message, qrcode, scene, status } = await getUnlimitedQRCode('pages/login/scan');
  const session = await AuthService.createLoginSession('pages/login/scan');
  res.success(session, '获取二维码成功');
};

/**
 * 查询二维码登录状态
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const checkQrcodeStatus = async (req, res) => {
  const { scene } = req.query;
  if (!scene) {
    return res.error('参数不完整');
  }
  const { status, expiresAt, message, success, openid, code } =
    await AuthService.checkLoginStatus(scene);

  if (!success) {
    return res.success(success, message, code);
  }

  if (status !== 'confirmed') {
    return res.success(status, message, code);
  }
  const info = await getUserInfo({ openid });
  const token = generateToken({ id: info._id, openid: info.openid, role: info.role });
  const userInfo = {
    ...info,
  };
  const resData = {
    token,
    userInfo,
    role: info.role,
    openid: info.openid,
  };
  res.success(resData, message);
};

/**
 * 确认小程序扫码登录
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const confirmQrcodeLogin = async (req, res) => {
  const { scene } = req.body;
  if (!scene) {
    return res.status(400).send({
      code: 4000,
      message: '参数不完整',
    });
  }

  const info = await getUserInfo(req.user);
  const { success, message } = await AuthService.confirmLogin(scene, info);
  if (success) {
    res.success(success, message);
  } else {
    res.error(message);
  }
};

export const qrCodeScanning = async (req, res) => {
  const { scene } = req.body;
  if (!scene) {
    return res.status(400).send({
      code: 4000,
      message: '参数不完整',
    });
  }
  await AuthService.updateLoginSession(scene, req.user);
  res.success(true, '更新成功');
};

/**
 * 查询用户角色
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getUserRole = async (req, res) => {
  try {
    const info = await getUserInfo(req.user);

    if (!info) {
      return res.status(404).send({
        code: 404,
        message: '用户不存在',
      });
    }

    res.send({
      code: 2000,
      data: {
        role: info.role,
        userId: info.id || info._id,
      },
      message: '获取用户角色成功',
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    res.status(500).send({
      code: 500,
      message: `服务器内部错误: ${error.message}`,
    });
  }
};
