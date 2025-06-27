import express from 'express';
import {
  analysisVideo,
  getVideoDataController,
  saveVideoDataController,
} from '../../controllers/douyin.controller.js';

const douyinRouter = express.Router();

/**
 * @api {post} /api/douyin 混合解析单一视频接口
 * @apiName 混合解析单一视频接口
 * @apiGroup 抖音
 * @apiVersion 1.0.0
 */
douyinRouter.post('/', analysisVideo);

/**
 * @api {get} /api/douyin/save 保存视频数据接口
 * @apiName 保存视频数据接口
 * @apiGroup 抖音
 * @apiVersion 1.0.0
 */
douyinRouter.post('/save', saveVideoDataController);

/**
 * @api {get} /api/douyin/get 获取视频数据接口
 * @apiName 获取视频数据接口
 * @apiGroup 抖音
 * @apiVersion 1.0.0
 */
douyinRouter.get('/get', getVideoDataController);

export default douyinRouter;
