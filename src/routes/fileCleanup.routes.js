import express from 'express';
import {
  getStats,
  getCleanupList,
  manualCleanup,
  markAsUsed,
  markAsUnused
} from '../controllers/fileCleanup.controller.js';

const router = express.Router();

/**
 * @route GET /api/file-cleanup/stats
 * @desc 获取文件资源统计信息
 * @access Public
 */
router.get('/stats', getStats);

/**
 * @route GET /api/file-cleanup/list
 * @desc 获取待清理文件列表
 * @query {number} limit - 限制返回数量，默认50
 * @access Public
 */
router.get('/list', getCleanupList);

/**
 * @route POST /api/file-cleanup/manual
 * @desc 手动执行文件清理
 * @body {number} batchSize - 批量清理数量，默认50
 * @access Public
 */
router.post('/manual', manualCleanup);

/**
 * @route POST /api/file-cleanup/mark-used
 * @desc 标记文件为已使用
 * @body {string} fileUrl - 文件URL
 * @body {string} businessType - 业务类型
 * @body {string} businessId - 业务ID（可选）
 * @access Public
 */
router.post('/mark-used', markAsUsed);

/**
 * @route POST /api/file-cleanup/mark-unused
 * @desc 标记文件为未使用
 * @body {string} fileUrl - 文件URL
 * @body {string} businessType - 业务类型
 * @body {string} businessId - 业务ID（可选）
 * @access Public
 */
router.post('/mark-unused', markAsUnused);

export default router;