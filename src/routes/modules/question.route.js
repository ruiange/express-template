// question.route.js

import express from 'express';
import QuestionController from '../../controllers/question.controller.js';

const questionRoute = express.Router();

/**
 * @api {get} /api/question/list 获取题库列表
 * @apiDescription 获取题库列表，支持分页、筛选和排序
 * @apiName GetQuestionList
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} [page=1] 页码
 * @apiParam {Number} [limit=10] 每页数量
 * @apiParam {String} [category] 分类筛选
 * @apiParam {String} [tags] 标签筛选
 * @apiParam {Number} [difficulty] 难度筛选
 * @apiParam {String} [keyword] 关键词搜索
 * @apiParam {String} [sortBy=createdAt] 排序字段
 * @apiParam {String} [sortOrder=desc] 排序方式，asc或desc
 * 
 * @apiSuccess {Object[]} questions 题目列表
 * @apiSuccess {Object} pagination 分页信息
 * @apiSuccess {Number} pagination.total 总数
 * @apiSuccess {Number} pagination.page 当前页码
 * @apiSuccess {Number} pagination.limit 每页数量
 * @apiSuccess {Number} pagination.totalPages 总页数
 */
questionRoute.get('/list', QuestionController.getQuestionList);

/**
 * @api {get} /api/question/:id 获取题目详情
 * @apiDescription 根据ID获取题目的详细信息
 * @apiName GetQuestionDetail
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id 题目ID
 * 
 * @apiSuccess {Object} question 题目详情
 * @apiSuccess {Number} question.id 题目ID
 * @apiSuccess {String} question.title 题目标题
 * @apiSuccess {String} question.content 题目内容
 * @apiSuccess {String} question.answer 题目答案
 * @apiSuccess {Number} question.difficulty 难度级别
 * @apiSuccess {String} question.category 题目分类
 * @apiSuccess {String} question.tags 题目标签
 * @apiSuccess {Date} question.createdAt 创建时间
 * @apiSuccess {Date} question.updatedAt 更新时间
 * 
 * @apiError {String} message 错误信息
 * @apiError {Number} code 错误代码
 */
questionRoute.get('/:id', QuestionController.getQuestionDetail);

/**
 * @api {post} /api/question/create 创建题目
 * @apiDescription 创建新的题目
 * @apiName CreateQuestion
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} title 题目标题
 * @apiParam {String} content 题目内容
 * @apiParam {String} answer 题目答案
 * @apiParam {Number} [difficulty=3] 难度级别
 * @apiParam {String} [category] 题目分类
 * @apiParam {String} [tags] 题目标签
 * 
 * @apiSuccess {Object} question 创建的题目
 * @apiSuccess {Number} question.id 题目ID
 * @apiSuccess {String} question.title 题目标题
 * @apiSuccess {String} question.content 题目内容
 * @apiSuccess {String} question.answer 题目答案
 * @apiSuccess {Number} question.difficulty 难度级别
 * @apiSuccess {String} question.category 题目分类
 * @apiSuccess {String} question.tags 题目标签
 * @apiSuccess {Date} question.createdAt 创建时间
 * @apiSuccess {Date} question.updatedAt 更新时间
 * 
 * @apiError {String} message 错误信息
 * @apiError {Number} code 错误代码
 */
questionRoute.post('/create', QuestionController.createQuestion);

/**
 * @api {put} /api/question/:id 更新题目
 * @apiDescription 更新现有题目的信息
 * @apiName UpdateQuestion
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id 题目ID
 * @apiParam {String} [title] 题目标题
 * @apiParam {String} [content] 题目内容
 * @apiParam {String} [answer] 题目答案
 * @apiParam {Number} [difficulty] 难度级别
 * @apiParam {String} [category] 题目分类
 * @apiParam {String} [tags] 题目标签
 * 
 * @apiSuccess {Object} question 更新后的题目
 * @apiSuccess {Number} question.id 题目ID
 * @apiSuccess {String} question.title 题目标题
 * @apiSuccess {String} question.content 题目内容
 * @apiSuccess {String} question.answer 题目答案
 * @apiSuccess {Number} question.difficulty 难度级别
 * @apiSuccess {String} question.category 题目分类
 * @apiSuccess {String} question.tags 题目标签
 * @apiSuccess {Date} question.createdAt 创建时间
 * @apiSuccess {Date} question.updatedAt 更新时间
 * 
 * @apiError {String} message 错误信息
 * @apiError {Number} code 错误代码
 */
questionRoute.put('/:id', QuestionController.updateQuestion);

/**
 * @api {delete} /api/question/:id 删除题目
 * @apiDescription 删除指定ID的题目
 * @apiName DeleteQuestion
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id 题目ID
 * 
 * @apiSuccess {Boolean} success 删除成功
 * 
 * @apiError {String} message 错误信息
 * @apiError {Number} code 错误代码
 */
questionRoute.delete('/:id', QuestionController.deleteQuestion);

export default questionRoute;
