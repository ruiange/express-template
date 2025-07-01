import express from 'express';
import { miniLogin } from '../../controllers/mini.controller.js';
/**
 * @api {post} /mini/login 小程序登录
 * @apiName MiniLogin
 * @apiGroup 小程序
 * @apiDescription 小程序登录接口
 *
 * @apiParam {String} code 小程序登录时获取的临时登录凭证
 *
 * @apiSuccess {String} token 用户登录令牌
 * @apiSuccess {Number} userId 用户ID
 *
 * @apiError (Error 400) InvalidCode 提供的code无效
 * @apiError (Error 500) InternalServerError 服务器内部错误
 */
const miniRoute = express.Router();

miniRoute.post('/login', miniLogin);

export default miniRoute;
