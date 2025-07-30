import express from 'express';
import fileCleanupController from '../../controllers/fileCleanup.controller.js';

const fileCleanupRoute = express.Router();

/**
 * @route GET /api/file-cleanup/stats
 * @desc 获取文件资源统计信息
 * @access Public
 */
fileCleanupRoute.get('/stats', (req, res) => fileCleanupController.getStats(req, res));

/**
 * @route GET /api/file-cleanup/list
 * @desc 获取待清理文件列表
 * @query {number} limit - 限制返回数量，默认50
 * @access Public
 */
fileCleanupRoute.get('/list', (req, res) => fileCleanupController.getCleanupList(req, res));

/**
 * @route POST /api/file-cleanup/manual
 * @desc 手动执行文件清理
 * @body {number} batchSize - 批量清理数量，默认50
 * @access Public
 */
fileCleanupRoute.post('/manual', (req, res) => fileCleanupController.manualCleanup(req, res));

/**
 * @route POST /api/file-cleanup/mark-used
 * @desc 标记文件为已使用
 * @body {string} fileUrl - 文件URL
 * @body {string} businessType - 业务类型
 * @body {string} businessId - 业务ID（可选）
 * @access Public
 */
fileCleanupRoute.post('/mark-used', (req, res) => fileCleanupController.markAsUsed(req, res));

/**
 * @route POST /api/file-cleanup/mark-unused
 * @desc 标记文件为未使用
 * @body {string} fileUrl - 文件URL
 * @body {string} businessType - 业务类型
 * @body {string} businessId - 业务ID（可选）
 * @access Public
 */
fileCleanupRoute.post('/mark-unused', (req, res) => fileCleanupController.markAsUnused(req, res));

export default fileCleanupRoute;