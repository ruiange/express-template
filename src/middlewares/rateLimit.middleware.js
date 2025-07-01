import rateLimit from 'express-rate-limit';


/*
windowMs | 限流时间窗口（毫秒）
max | 每个 IP 在时间窗口内最多请求次数
message | 超出限制时的响应消息
handler(req, res) | 自定义超限时的响应逻辑
keyGenerator(req) | 自定义用于区分用户/IP 的 key
skip(req) | 返回 true 则跳过限流
*/

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟的时间窗口
  max: 100, // 每个IP在窗口内最多请求100次
  message: '请求太频繁，请稍后再试。',
  standardHeaders: true, // 设置RateLimit相关的标准头
  legacyHeaders: false, // 关闭旧的X-RateLimit-*头
});

export default rateLimitMiddleware; 