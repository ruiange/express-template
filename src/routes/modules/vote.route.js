import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { getMine, getStats, postVote } from '../../controllers/vote.controller.js';

const router = express.Router();

/**
 * @api {post} /vote 提交/更新投票
 * @apiName PostVote
 * @apiGroup 投票
 * @apiDescription 用户对题目投 “会/不会”，重复提交将更新投票值
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiBody {String} questionId 题目ID
 * @apiBody {Number{0..1}} value 投票值，1=会，0=不会
 *
 * @apiSuccess {Number} code 业务码
 * @apiSuccess {Object} data 投票记录
 * @apiSuccess {String} data._id 记录ID
 * @apiSuccess {String} data.user 用户ID
 * @apiSuccess {String} data.question 题目ID
 * @apiSuccess {Number} data.value 投票值
 * @apiSuccess {String} message 提示信息
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "code": 0,
 *     "data": { "_id": "...", "user": "...", "question": "...", "value": 1 },
 *     "message": "success"
 *   }
 *
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   { "code": 4000, "message": "投票失败" }
 */
router.post('/', authMiddleware, postVote);

/**
 * @api {get} /vote/mine/:questionId 查询我在某题目的投票
 * @apiName GetMyVote
 * @apiGroup 投票
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {String} questionId 题目ID
 *
 * @apiSuccess {Number} code 业务码
 * @apiSuccess {Object} data 投票记录（未投票时为空对象）
 * @apiSuccess {String} [data._id] 记录ID
 * @apiSuccess {String} [data.user] 用户ID
 * @apiSuccess {String} [data.question] 题目ID
 * @apiSuccess {Number{0..1}} [data.value] 投票值
 * @apiSuccess {String} message 提示信息
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "code": 0,
 *     "data": { "_id": "...", "user": "...", "question": "...", "value": 0 },
 *     "message": "success"
 *   }
 */
router.get('/mine/:questionId', authMiddleware, getMine);

/**
 * @api {get} /vote/stats/:questionId 查询题目投票统计（需登录）
 * @apiName GetVoteStats
 * @apiGroup 投票
 * @apiDescription 必须登录，返回统计并附带当前用户是否投票及其投票值
 *
 * @apiParam {String} questionId 题目ID
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Number} code 业务码
 * @apiSuccess {Object} data 统计信息
 * @apiSuccess {Number} data.yes “会”数量
 * @apiSuccess {Number} data.no “不会”数量
 * @apiSuccess {Number} data.total 总投票数
 * @apiSuccess {Boolean} data.myVoted 是否已投票
 * @apiSuccess {Number{0..1}} [data.myValue] 我的投票值（未投票时为空）
 * @apiSuccess {String} message 提示信息
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "code": 0,
 *     "data": { "yes": 10, "no": 3, "total": 13, "myVoted": true, "myValue": 1 },
 *     "message": "success"
 *   }
 */
router.get('/stats/:questionId', authMiddleware, getStats);

export default router;


