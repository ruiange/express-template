import express from 'express';
import { analysisVideo } from '../../controllers/douyin.controller.js';

const douyinRouter = express.Router();

/**
 * @api {post} /api/douyin 混合解析单一视频接口
 * @apiName 混合解析单一视频接口
 * @apiGroup 抖音
 * @apiVersion 1.0.0
 */
douyinRouter.post('/', analysisVideo);

export default douyinRouter;
