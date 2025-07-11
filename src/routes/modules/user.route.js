import express from 'express';
import { register, updateProfile, viewProfile } from '../../controllers/user.controller.js';
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

export default userRoute;
