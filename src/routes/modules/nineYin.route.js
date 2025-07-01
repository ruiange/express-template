import express from 'express';
import { scanNewsController } from '../../controllers/nineYin.controllers.js';

const nineYinRoute = express.Router();

/**
 * @api {get} /9yin/scan/news 获取九阴新闻列表
 * @apiName GetNineYinNews
 * @apiGroup 九阴
 * @apiVersion 1.0.0
 *
 * @apiParams {Number} [page=0] 页码，默认为0
 *
 * @apiDescription 从九阴官网爬取最新的新闻列表信息
 *
 * @apiSuccess {Number} code 状态码 (2000: 成功)
 * @apiSuccess {String} msg 响应消息
 * @apiSuccess {Object[]} data 新闻列表数据
 * @apiSuccess {String} data.newsId 新闻ID
 * @apiSuccess {String} data.title 新闻标题
 * @apiSuccess {String} data.url 新闻链接
 * @apiSuccess {String} data.time 发布时间
 *
 * @apiSuccessExample {json} 成功响应示例:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 2000,
 *       "msg": "success",
 *       "data": [{
 *         "newsId": "123456",
 *         "title": "九阴真经重要更新公告",
 *         "url": "https://9yin.woniu.com/news/123456.html",
 *         "time": "2024-01-20"
 *       }]
 *     }
 */
nineYinRoute.get('/scan/news', scanNewsController);

export default nineYinRoute;
