import express from 'express';
import fileResourcesController from '../../controllers/fileResources.controller.js';

const fileResourcesRoute = express.Router();

/**
 * @api {get} /api/file-cleanup/stats 获取文件资源统计信息
 * @apiName GetFileStats
 * @apiGroup 资源管理
 * @apiDescription 获取文件资源的统计信息，包括各种状态的文件数量
 * 
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {Object} data 统计数据
 * @apiSuccess {Number} data.total 文件总数
 * @apiSuccess {Number} data.pending 待处理文件数
 * @apiSuccess {Number} data.active 活跃文件数
 * @apiSuccess {Number} data.unused 未使用文件数
 * @apiSuccess {Number} data.deleted 已删除文件数
 * @apiSuccess {String} message 响应消息
 */
fileResourcesRoute.get('/stats', (req, res) => fileResourcesController.getStats(req, res));

/**
 * @api {get} /api/file-cleanup/list 获取待清理文件列表
 * @apiName GetCleanupList
 * @apiGroup 资源管理
 * @apiDescription 获取待清理的文件列表
 * 
 * @apiParam {Number} [limit=50] 限制返回数量
 * 
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {Object} data 响应数据
 * @apiSuccess {Object[]} data.files 文件列表
 * @apiSuccess {Number} data.count 文件数量
 * @apiSuccess {String} message 响应消息
 */
fileResourcesRoute.get('/list', (req, res) => fileResourcesController.getCleanupList(req, res));

/**
 * @api {post} /api/file-cleanup/manual 手动执行文件清理
 * @apiName ManualCleanup
 * @apiGroup 资源管理
 * @apiDescription 手动触发文件清理任务
 * 
 * @apiParam {Number} [batchSize=50] 批量清理数量
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *   "batchSize": 50
 * }
 * 
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {Object} data 清理结果
 * @apiSuccess {Number} data.total 总处理文件数
 * @apiSuccess {Number} data.success 成功清理数
 * @apiSuccess {Number} data.failed 清理失败数
 * @apiSuccess {String} message 响应消息
 */
fileResourcesRoute.post('/manual', (req, res) => fileResourcesController.manualCleanup(req, res));

/**
 * @api {post} /api/file-cleanup/mark-used 标记文件为已使用
 * @apiName MarkFileAsUsed
 * @apiGroup 资源管理
 * @apiDescription 将文件标记为已使用状态
 * 
 * @apiParam {String} fileUrl 文件URL
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *   "fileUrl": "https://example.com/files/image.jpg"
 * }
 * 
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message 响应消息
 */
fileResourcesRoute.post('/mark-used', (req, res) => fileResourcesController.markAsUsed(req, res));

/**
 * @api {post} /api/file-cleanup/mark-unused 标记文件为未使用
 * @apiName MarkFileAsUnused
 * @apiGroup 资源管理
 * @apiDescription 将文件标记为未使用状态
 * 
 * @apiParam {String} fileUrl 文件URL
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *   "fileUrl": "https://example.com/files/image.jpg"
 * }
 * 
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message 响应消息
 */
fileResourcesRoute.post('/mark-unused', (req, res) => fileResourcesController.markAsUnused(req, res));

/**
 * @api {get} /api/file-cleanup/all 文件资源数据列表
 * @apiName GetAllFiles
 * @apiGroup 资源管理
 * @apiDescription 分页获取所有文件资源数据，支持状态和存储提供商过滤
 * 
 * @apiParam {Number} [current=1] 当前页码
 * @apiParam {Number} [pageSize=20] 每页数量
 * @apiParam {String} [status] 文件状态过滤（pending/active/unused/deleted）
 * @apiParam {String} [storageProvider] 存储提供商过滤
 * 
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {Object[]} data 文件资源列表
 * @apiSuccess {Object} pagination 分页信息
 * @apiSuccess {Number} pagination.current 当前页码
 * @apiSuccess {Number} pagination.pageSize 每页数量
 * @apiSuccess {Number} pagination.totalCount 总记录数
 * @apiSuccess {Number} pagination.totalPages 总页数
 * @apiSuccess {Boolean} pagination.hasNext 是否有下一页
 * @apiSuccess {Boolean} pagination.hasPrev 是否有上一页
 * @apiSuccess {String} message 响应消息
 */
fileResourcesRoute.get('/all', (req, res) => fileResourcesController.getAllFiles(req, res));

export default fileResourcesRoute;