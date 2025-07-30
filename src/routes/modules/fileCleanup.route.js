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

/**
 * @route GET /api/file-cleanup/all
 * @desc 分页获取所有文件资源数据
 * @query {number} page - 页码，默认1
 * @query {number} limit - 每页数量，默认20
 * @query {string} status - 文件状态过滤（pending/active/unused/deleted）
 * @query {string} storageProvider - 存储提供商过滤
 * @access Public
 */
fileCleanupRoute.get('/all', (req, res) => fileCleanupController.getAllFiles(req, res));

export default fileCleanupRoute;