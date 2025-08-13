import express from 'express';

/**
 * 健康检查路由
 * 用于Docker健康检查和服务状态监控
 */
const healthRouter = express.Router();

/**
 * @api {get} /api/health 健康检查
 * @apiName GetHealth
 * @apiGroup Health
 * @apiDescription 获取服务健康状态
 * 
 * @apiSuccess {String} status 服务状态
 * @apiSuccess {String} timestamp 当前时间戳
 * @apiSuccess {Number} uptime 服务运行时间（秒）
 * @apiSuccess {String} environment 运行环境
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "ok",
 *       "timestamp": "2024-01-01T00:00:00.000Z",
 *       "uptime": 123.456,
 *       "environment": "development"
 *     }
 */
healthRouter.get('/', (req, res) => {
  try {
    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    res.status(200).json(healthStatus);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

export default healthRouter;