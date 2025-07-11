import express from 'express';
import { muyuAddWealth, muyuRankList } from '../../controllers/wealth.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
/**
 * @api {post} /wealth/muyu 敲木鱼增加财富
 * @apiName WealthMuyu
 * @apiGroup 财富
 * @apiDescription 敲木鱼增加财富
 */
const wealthRoute = express.Router();

wealthRoute.post('/muyu', authMiddleware, muyuAddWealth);
wealthRoute.get('/muyu', authMiddleware, muyuRankList);

export default wealthRoute;
