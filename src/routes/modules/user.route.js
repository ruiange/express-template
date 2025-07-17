import express from 'express';
import {
  checkQrcodeStatus, confirmQrcodeLogin,
  generateLoginQrcode,
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
 * @apiBody {String} username 用户名
 * @apiBody {String} password 密码
 * @apiBody {String} email 电子邮箱
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
 * @api {get} /user/login-qrcode/status 查询二维码状态
 * @apiName CheckQrcodeStatus
 * @apiGroup 用户
 *
 * @apiBody {String} scene 二维码场景值
 */
userRoute.get('/login-qrcode/status', checkQrcodeStatus);

/**
 * @api {post} /user/login-qrcode/confirm 确认扫码登录
 * @apiName ConfirmQrcodeLogin
 * @apiGroup 用户
 *
 * @apiBody {String} scene 二维码场景值
 * @apiBody {Object} adminInfo 管理员信息
 */
userRoute.post('/login-qrcode/confirm', authMiddleware, confirmQrcodeLogin);

export default userRoute;
