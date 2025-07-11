import express from 'express';
import {
  analysisVideo,
  getDouyinDataList,
  getVideoDataController,
  saveVideoDataController,
} from '../../controllers/douyin.controller.js';

const douyinRoute = express.Router();

/**
 * @api {post} /douyin 混合解析单一视频接口
 * @apiName 混合解析单一视频接口
 * @apiGroup 抖音
 * @apiVersion 1.0.0
 */
douyinRoute.post('/', analysisVideo);

/**
 * @api {get} /douyin/save 保存视频数据接口
 * @apiName 保存视频数据接口
 * @apiGroup 抖音
 * @apiVersion 1.0.0
 */
douyinRoute.post('/save', saveVideoDataController);

/**
 * @api {get} /douyin/get 获取视频数据接口
 * @apiName 获取视频数据接口
 * @apiGroup 抖音
 * @apiVersion 1.0.0
 */
douyinRoute.get('/get', getVideoDataController);

/**
 * @api {get} /douyin/dataList 获取视频数据列表接口
 * @apiName 获取视频数据请求列表
 * @apiGroup 抖音
 * @apiVersion 1.0.0
 */
douyinRoute.get('/dataList', getDouyinDataList);

export default douyinRoute;
