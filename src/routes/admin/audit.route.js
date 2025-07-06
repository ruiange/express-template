import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { auditConfigController } from '../../controllers/admin.controller.js';

const auditRoute = express.Router();

/**
 * @api {put} /admin/audit/config 修改审核配置
 * @apiName 修改审核配置
 * @apiGroup 后台管理
 * @apiVersion 1.0.0
 */
auditRoute.put('/config', authMiddleware, adminMiddleware, auditConfigController);

export default auditRoute;
