import { verifyToken } from '../utils/jwt.util.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // 从请求头获取token
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return res.status(401).json({ code: 4001, message: '未提供认证token' });
    }

    // 验证token格式
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    if (!token) {
      return res.status(401).json({ code: 4001, message: '无效的token格式' });
    }

    try {
      // 验证token并解码
      // 将解码后的用户信息添加到请求对象中
      req.user = verifyToken(token);
      next();
    } catch (error) {
      return res.status(401).json({ code: 4001, message: 'token已过期或无效' });
    }
  } catch (error) {
    return res.status(500).json({ code: 5000, message: `服务器内部错误${error.message}` });
  }
};