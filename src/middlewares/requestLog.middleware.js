import Logs from '../models/logs.model.js';

/**
 * 请求日志中间件
 * 记录每个HTTP请求的关键信息并保存到数据库
 * @param {import('express').Request} req - Express请求对象
 * @param {import('express').Response} res - Express响应对象
 * @param {import('express').NextFunction} next - Express next函数
 */
export const requestLogMiddleware = async (req, res, next) => {
  // 保存原始的res.end方法
  const originalEnd = res.end;

  // 重写res.end方法以捕获响应状态码
  res.end = async function (chunk, encoding) {
    // 恢复原始的end方法
    res.end = originalEnd;

    const params = {
      method: req.method,
      url: req.originalUrl || req.url,
      status_code: res.statusCode,
      ip: getClientIp(req),
      user_agent: req.get('user-agent') || '',
    };
    try {
      if(process.env.NODE_ENV === 'development'){
        const log = new Logs(params);
        await log.save();
      }
    } catch (error) {
      console.error('Error saving request log:', error.message);
    }

    // 调用原始的end方法
    return res.end(chunk, encoding);
  };

  next();
};

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    // 如果有代理，返回第一个IP地址
    return forwardedFor.split(',')[0];
  }
  return req.socket.remoteAddress || 'unknown';
};