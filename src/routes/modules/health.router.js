import express from 'express';

const healthRouter = express.Router();

/**
 * @api {get} /api/health 健康检查
 * @apiName HealthCheck
 * @apiGroup System
 * @apiDescription 检查服务是否正常运行
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Object} data 响应数据
 * @apiSuccess {String} data.status 服务状态
 * @apiSuccess {String} data.timestamp 检查时间
 * @apiSuccess {String} data.uptime 运行时间
 * @apiSuccess {String} data.environment 运行环境
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 2000,
 *       "message": "服务正常",
 *       "data": {
 *         "status": "healthy",
 *         "timestamp": "2023-12-01T10:00:00.000Z",
 *         "uptime": "1h 30m 45s",
 *         "environment": "production"
 *       }
 *     }
 */
healthRouter.get('/', (req, res) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  res.json({
    code: 2000,
    message: '服务正常',
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: `${hours}h ${minutes}m ${seconds}s`,
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

export default healthRouter;