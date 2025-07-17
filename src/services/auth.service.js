import { v4 as uuidv4 } from 'uuid';
import loginSessionRepository from '../db/om/LoginSession.om.js';
import getUnlimitedQRCode from '../utils/wechat/getUnlimitedQRCode.util.js';

class AuthService {
  // 创建登录会话
  static async createLoginSession(page) {
    const scene = uuidv4();

    const qrcode = await getUnlimitedQRCode(page, scene);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5分钟有效期

    const params = {
      scene,
      status: 'waiting',
      createdAt: now,
      expiresAt,
    };

    const data = await loginSessionRepository.save(params);

    return {
      ...data,
      qrcode,
    };
  }

  // 检查登录状态（轮询接口）
  static async checkLoginStatus(scene) {
    const now = new Date();

    const session = await loginSessionRepository
      .search()
      .where('scene')
      .equals(scene)
      .return.first();

    if (!session) {
      return { error: '会话不存在' };
    }

    if(session.expiresAt  < now){
      return { error: '会话已过期' };
    }
    console.log(session);

    return {
      status: session.status,
      expiresAt: session.expiresAt,
    };
  }

  // 确认登录（小程序端调用）
  static async confirmLogin(scene, userInfo) {
    const session = await loginSessionRepository.fetch(scene);

    if (!session) {
      return { message: '会话不存在', success: false };
    }

    if (session.status !== 'waiting') {
      return { message: '会话已处理', success: false };
    }

    session.status = 'confirmed';
    session.openid = userInfo.openid;
    session.confirmedAt = new Date();

    await loginSessionRepository.save(session);

    return { success: true, message: '登录成功' };
  }

  // 清理过期会话
  static async cleanExpiredSessions() {
    const now = new Date();

    // 查询所有已过期的会话
    const expiredSessions = await loginSessionRepository
      .search()
      .where('expiresAt')
      .lt(now.toISOString())
      .return.all();

    // 遍历并逐个删除
    for (const session of expiredSessions) {
      await loginSessionRepository.remove(session.scene); // 使用 scene 作为主键
    }

    return expiredSessions.length;
  }
}

export default AuthService;
