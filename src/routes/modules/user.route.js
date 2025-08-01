import express from 'express';
import {
  checkQrcodeStatus,
  confirmQrcodeLogin,
  generateLoginQrcode, qrCodeScanning,
  getUserRole,
  register,
  updateProfile,
  viewProfile,
} from '../../controllers/user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const userRoute = express.Router();

/**
 * @api {post} /user/register 用户注册
 * @apiName RegisterUser
 * @apiGroup 用户
 * @apiDescription 新用户注册接口
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} email 电子邮箱
 *
 * @apiSuccess {String} message 注册成功提示
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "用户注册成功"
 *     }
 *
 * @apiError {String} message 错误信息
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "用户名或邮箱已被使用"
 *     }
 */
userRoute.post('/register', register);

/**
 * @api {get} /user/ 查看个人资料
 * @apiName viewProfile
 * @apiGroup 用户
 */
userRoute.get('/', authMiddleware, viewProfile);

/**
 * @api {put} /user/ 修改个人资料
 * @apiName updateProfile
 * @apiGroup 用户
 *
 */
userRoute.put('/', authMiddleware, updateProfile);

/**
 * @api {post} /api/user/login-qrcode 生成登录二维码
 * @apiName GenerateLoginQrcode
 * @apiGroup 用户
 */
userRoute.post('/login-qrcode', generateLoginQrcode);

/**
 * @api {post} /api/user/login-qrcode/scanning 扫描登录二维码
 * @apiName qrCodeScanning
 * @apiGroup 用户
 *
 * @apiParam {String} scene 二维码场景值
 */
userRoute.post('/login-qrcode/scanning', qrCodeScanning);

/**
 * @api {get} /api/user/login-qrcode/status 查询二维码状态
 * @apiName CheckQrcodeStatus
 * @apiGroup 用户
 *
 * @apiParam {String} scene 二维码场景值
 */
userRoute.get('/login-qrcode/status', checkQrcodeStatus);

/**
 * @api {get} /user/role 查询用户角色
 * @apiName GetUserRole
 * @apiGroup 用户
 * @apiDescription 查询当前登录用户的角色信息
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Object} data 返回数据
 * @apiSuccess {String} data.role 用户角色
 * @apiSuccess {String} data.userId 用户ID
 * @apiSuccess {String} message 成功信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 2000,
 *       "data": {
 *         "role": "admin",
 *         "userId": "64f1a2b3c4d5e6f7g8h9i0j1"
 *       },
 *       "message": "获取用户角色成功"
 *     }
 *
 * @apiError {Number} code 错误状态码
 * @apiError {String} message 错误信息
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "用户不存在"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "未授权访问"
 *     }
 */
userRoute.get('/role', authMiddleware, getUserRole);

export default userRoute;
