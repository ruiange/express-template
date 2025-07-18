import express from 'express';
import { getUserList } from '../../controllers/admin.controller.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { confirmQrcodeLogin } from '../../controllers/user.controller.js';

const adminUserRoute = express.Router();

/**
 * @api {get} /api/admin/user/users 获取用户列表
 * @apiName GetUserList
 * @apiGroup 后台管理
 * @apiVersion 1.0.0
 * @apiDescription 管理员获取用户列表，支持分页和搜索功能
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 *
 * @apiParam {Number} [page=1] 页码，从1开始
 * @apiParam {Number} [limit=10] 每页数量，最大100
 * @apiParam {String} [search] 搜索关键词，支持用户名、昵称、邮箱模糊搜索
 *
 * @apiSuccess {Number} code 状态码，2000表示成功
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Object} data 响应数据
 * @apiSuccess {Array} data.users 用户列表
 * @apiSuccess {Number} data.users.id 用户ID
 * @apiSuccess {String} data.users.username 用户名
 * @apiSuccess {String} data.users.email 邮箱
 * @apiSuccess {String} data.users.nickname 昵称
 * @apiSuccess {String} data.users.avatar 头像URL
 * @apiSuccess {String} data.users.role 用户角色（user/admin）
 * @apiSuccess {String} data.users.createdAt 创建时间
 * @apiSuccess {String} data.users.updatedAt 更新时间
 * @apiSuccess {Number} data.users.createTime 创建时间戳
 * @apiSuccess {Object} data.pagination 分页信息
 * @apiSuccess {Number} data.pagination.currentPage 当前页码
 * @apiSuccess {Number} data.pagination.pageSize 每页数量
 * @apiSuccess {Number} data.pagination.total 总记录数
 * @apiSuccess {Number} data.pagination.totalPages 总页数
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 2000,
 *       "message": "获取用户列表成功",
 *       "data": {
 *         "users": [
 *           {
 *             "id": 1,
 *             "username": "testuser",
 *             "email": "test@example.com",
 *             "nickname": "测试用户",
 *             "avatar": "https://example.com/avatar.jpg",
 *             "role": "user",
 *             "createdAt": "2024-01-01T00:00:00.000Z",
 *             "updatedAt": "2024-01-01T00:00:00.000Z",
 *             "createTime": 1704067200
 *           }
 *         ],
 *         "pagination": {
 *           "currentPage": 1,
 *           "pageSize": 10,
 *           "total": 1,
 *           "totalPages": 1
 *         }
 *       }
 *     }
 *
 * @apiError (Error 401) {Object} Unauthorized 未授权访问
 * @apiError (Error 401) {Number} code 错误码，4001
 * @apiError (Error 401) {String} message 错误信息
 *
 * @apiErrorExample {json} Error-Response-401:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 4001,
 *       "message": "未经身份验证的用户"
 *     }
 *
 * @apiError (Error 403) {Object} Forbidden 权限不足
 * @apiError (Error 403) {Number} code 错误码，4003
 * @apiError (Error 403) {String} message 错误信息
 *
 * @apiErrorExample {json} Error-Response-403:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "code": 4003,
 *       "message": "权限不足，需要管理员权限"
 *     }
 *
 * @apiError (Error 500) {Object} InternalServerError 服务器内部错误
 * @apiError (Error 500) {Number} code 错误码，5000
 * @apiError (Error 500) {String} message 错误信息
 * @apiError (Error 500) {String} error 详细错误信息
 *
 * @apiErrorExample {json} Error-Response-500:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 5000,
 *       "message": "服务器内部错误",
 *       "error": "Database connection failed"
 *     }
 */
adminUserRoute.get('/users', authMiddleware, adminMiddleware, getUserList);

/**
 * @api {post} /api/admin/user/login-qrcode/confirm 确认扫码登录
 * @apiName ConfirmQrcodeLogin
 * @apiGroup 后台管理
 *
 * @apiBody {String} scene 二维码场景值
 * @apiBody {Object} adminInfo 管理员信息
 */
adminUserRoute.post('/login-qrcode/confirm', authMiddleware, adminMiddleware, confirmQrcodeLogin);

export default adminUserRoute;
