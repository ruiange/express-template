import { db } from '../config/db.js';
import { logsTable } from '../db/schema.js';
import  getClientIp  from '../utils/ip.util.js';

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

    try {
      // 记录请求日志
      await db.insert(logsTable).values({
        method: req.method,
        url: req.originalUrl || req.url,
        status_code: res.statusCode,
        ip: getClientIp(req),
        user_agent: req.get('user-agent') || '',
      });
    } catch (error) {
      console.error('Error saving request log:', error.message);
    }

    // 调用原始的end方法
    return res.end(chunk, encoding);
  };

  next();
};