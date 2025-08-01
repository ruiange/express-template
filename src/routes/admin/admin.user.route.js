import express from 'express';
import { deleteUsers, getUserList, updateUserController } from '../../controllers/admin.controller.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { confirmQrcodeLogin } from '../../controllers/user.controller.js';

const adminUserRoute = express.Router();

/**
 * @api {get} /admin/users 获取用户列表
 * @apiName GetUserList
 * @apiGroup 用户管理
 * @apiDescription 管理员获取用户列表，支持分页、搜索和筛选
 *
 * @apiHeader {String} Authorization Bearer token，用户登录后获取
 *
 * @apiParam {Number} [current=1] 当前页码
 * @apiParam {Number} [pageSize=10] 每页数量
 * @apiParam {String} [search] 搜索关键词（用户名、昵称、邮箱）
 * @apiParam {String} [role] 角色筛选
 * @apiParam {Number} [membership] 会员等级筛选
 *
 * @apiSuccess {Number} code 状态码，2000表示成功
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Object} data 响应数据
 * @apiSuccess {Array} data.list 用户列表
 * @apiSuccess {Object} data.pagination 分页信息
 * @apiSuccess {Number} data.pagination.current 当前页码
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
 *         "list": [
 *           {
 *             "id": 1,
 *             "username": "testuser",
 *             "nickname": "测试用户",
 *             "email": "test@example.com",
 *             "role": "user",
 *             "membership": 0
 *           }
 *         ],
 *         "pagination": {
 *           "current": 1,
 *           "pageSize": 10,
 *           "total": 1,
 *           "totalPages": 1
 *         }
 *       }
 *     }
 *
 * @apiError {Number} code 错误状态码
 * @apiError {String} message 错误消息
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 4001,
 *       "message": "未授权访问"
 *     }
 */
adminUserRoute.get('/list', authMiddleware, adminMiddleware, getUserList);

/**
 * @api {put} /admin/users/:id 更新用户信息
 * @apiName UpdateUser
 * @apiGroup 用户管理
 * @apiDescription 管理员更新指定用户的信息
 *
 * @apiHeader {String} Authorization Bearer token，用户登录后获取
 *
 * @apiParam {Number} id 用户ID（路径参数）
 * @apiParam {String} [username] 用户名
 * @apiParam {String} [nickname] 昵称
 * @apiParam {String} [email] 邮箱
 * @apiParam {String} [role] 角色
 * @apiParam {Number} [membership] 会员等级
 * @apiParam {String} [avatar] 头像URL
 * @apiParam {String} [phone] 手机号
 *
 * @apiSuccess {Number} code 状态码，2000表示成功
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Object} data 更新后的用户信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 2000,
 *       "message": "用户信息更新成功",
 *       "data": {
 *         "id": 1,
 *         "username": "newusername",
 *         "nickname": "新昵称",
 *         "email": "newemail@example.com",
 *         "role": "user",
 *         "membership": 1
 *       }
 *     }
 *
 * @apiError {Number} code 错误状态码
 * @apiError {String} message 错误消息
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 4004,
 *       "message": "用户不存在"
 *     }
 */
adminUserRoute.put('/:id', authMiddleware, adminMiddleware, updateUserController);

/**
 * @api {delete} /admin/users/delete 批量删除用户
 * @apiName DeleteUsers
 * @apiGroup 用户管理
 * @apiDescription 管理员批量删除用户
 *
 * @apiHeader {String} Authorization Bearer token，用户登录后获取
 *
 * @apiParam {Array} ids 要删除的用户ID数组
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "ids": [1, 2, 3]
 *     }
 *
 * @apiSuccess {Number} code 状态码，2000表示成功
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} data 删除的记录数
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 2000,
 *       "message": "删除成功",
 *       "data": 3
 *     }
 *
 * @apiError {Number} code 错误状态码
 * @apiError {String} message 错误消息
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 4000,
 *       "message": "请选择要删除的用户"
 *     }
 */
adminUserRoute.delete('/delete', authMiddleware, adminMiddleware, deleteUsers);

/**
 * @api {post} /admin/users/login-qrcode/confirm 确认二维码登录
 * @apiName ConfirmQrcodeLogin
 * @apiGroup 用户管理
 * @apiDescription 管理员确认用户的二维码登录请求
 *
 * @apiHeader {String} Authorization Bearer token，用户登录后获取
 *
 * @apiParam {String} qrcodeId 二维码ID
 * @apiParam {Boolean} confirm 是否确认登录
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "qrcodeId": "qr_123456789",
 *       "confirm": true
 *     }
 *
 * @apiSuccess {Number} code 状态码，2000表示成功
 * @apiSuccess {String} message 响应消息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 2000,
 *       "message": "二维码登录确认成功"
 *     }
 *
 * @apiError {Number} code 错误状态码
 * @apiError {String} message 错误消息
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 4000,
 *       "message": "二维码已过期"
 *     }
 */
adminUserRoute.post('/login-qrcode/confirm', authMiddleware, adminMiddleware, confirmQrcodeLogin);


export default adminUserRoute;
