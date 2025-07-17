import { v4 as uuidv4 } from 'uuid';
import loginSessionRepository from '../db/om/LoginSession.om.js';
import getUnlimitedQRCode from '../utils/wechat/getUnlimitedQRCode.util.js';

class AuthService {
  // 创建登录会话
  static async createLoginSession(page) {
    const scene = uuidv4();

    const qrcode = await getUnlimitedQRCode(page,scene)

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5分钟有效期

    const params = {
      scene,
      status: 'waiting',
      qrcode,
      createdAt: now,
      expiresAt,
      lastPollTime: now,
    }
    //console.log(params)

    return await loginSessionRepository.save(params);
  }

  // 检查登录状态（轮询接口）
  static async checkLoginStatus(scene) {
    const now = new Date();
    const session = await loginSessionRepository.fetch(scene);

    if (!session) {
      return { error: '会话不存在' };
    }

    // 更新最后轮询时间
    session.lastPollTime = now;
    await loginSessionRepository.save(session);

    // 检查是否过期
    if (new Date(session.expiresAt) < now) {
      session.status = 'expired';
      await loginSessionRepository.save(session);
    }

    return {
      status: session.status,
      userInfo: session.userInfo ? JSON.parse(session.userInfo) : null,
      expiresAt: session.expiresAt,
    };
  }

  // 确认登录（小程序端调用）
  static async confirmLogin(scene, userInfo) {
    const session = await loginSessionRepository.fetch(scene);

    if (!session) {
      return { error: '会话不存在' };
    }

    if (session.status !== 'waiting') {
      return { error: '会话已处理' };
    }

    session.status = 'confirmed';
    session.openid = userInfo.openid;
    session.userInfo = JSON.stringify(userInfo);
    session.confirmedAt = new Date();

    await loginSessionRepository.save(session);

    return { success: true };
  }

  // 清理过期会话
  static async cleanExpiredSessions() {
    const now = new Date();
    const expiredSessions = await loginSessionRepository
      .search()
      .where('expiresAt')
      .before(now)
      .and('status')
      .equals('waiting')
      .return.all();

    for (const session of expiredSessions) {
      session.status = 'expired';
      await loginSessionRepository.save(session);
    }

    return expiredSessions.length;
  }
}

export default AuthService;