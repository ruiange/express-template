// question.route.js

import express from 'express';
import QuestionController from '../../controllers/question.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';

const questionRoute = express.Router();

/**
 * @api {get} /question/list 获取题库列表
 * @apiDescription 获取题库列表，支持分页、筛选和排序
 * @apiName GetQuestionList
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} [current=1] 页码
 * @apiParam {Number} [pageSize=10] 每页数量
 * @apiParam {String} [category] 分类筛选
 * @apiParam {String} [tags] 标签筛选
 * @apiParam {Number} [difficulty] 难度筛选
 * @apiParam {String} [keyword] 关键词搜索
 * @apiParam {String} [sortBy=createdAt] 排序字段
 * @apiParam {String} [sortOrder=desc] 排序方式，asc或desc
 * 
 * @apiSuccess {Object[]} list 题目列表
 * @apiSuccess {Object} pagination 分页信息
 * @apiSuccess {Number} pagination.total 总数
 * @apiSuccess {Number} pagination.current 当前页码
 * @apiSuccess {Number} pagination.pageSize 每页数量
 * @apiSuccess {Number} pagination.totalPages 总页数
 */
questionRoute.get('/list', QuestionController.getQuestionList);

/**
 * @api {get} /question/:id 获取题目详情
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
 * @api {post} /question/create 创建题目
 * @apiDescription 创建新的题目
 * @apiName CreateQuestion
 * @apiGroup 题库
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiBody {String} title 题目标题
 * @apiBody {String} content 题目内容
 * @apiBody {String} answer 题目答案
 * @apiBody {Number} [difficulty=3] 难度级别
 * @apiBody {String} [category] 题目分类
 * @apiBody {String} [tags] 题目标签
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
questionRoute.post('/create',authMiddleware,adminMiddleware, QuestionController.createQuestion);

/**
 * @api {patch} /question/:id 更新题目
 * @apiDescription 更新现有题目的信息
 * @apiName UpdateQuestion
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {Number} id 题目ID
 * @apiBody {String} [title] 题目标题
 * @apiBody {String} [content] 题目内容
 * @apiBody {String} [answer] 题目答案
 * @apiBody {Number} [difficulty] 难度级别
 * @apiBody {String} [category] 题目分类
 * @apiBody {String} [tags] 题目标签
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
questionRoute.patch('/:id',authMiddleware,adminMiddleware, QuestionController.updateQuestion);

/**
 * @api {post} /question/batch-delete 批量删除题目
 * @apiDescription 批量删除多个题目
 * @apiName BatchDeleteQuestions
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiBody {Number[]} ids 要删除的题目ID数组
 * 
 * @apiSuccess {Boolean} success 删除成功
 * @apiSuccess {Number} deletedCount 成功删除的题目数量
 * @apiSuccess {Number[]} failedIds 删除失败的题目ID数组
 * 
 * @apiError {String} message 错误信息
 * @apiError {Number} code 错误代码
 */
questionRoute.post('/batch-delete',authMiddleware,adminMiddleware, QuestionController.batchDeleteQuestions);

/**
 * @api {delete} /question/:id 删除题目
 * @apiDescription 删除指定ID的题目
 * @apiName DeleteQuestion
 * @apiGroup 题库
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiParam {Number} id 题目ID
 * 
 * @apiSuccess {Boolean} success 删除成功
 * 
 * @apiError {String} message 错误信息
 * @apiError {Number} code 错误代码
 */
questionRoute.delete('/:id',authMiddleware,adminMiddleware, QuestionController.deleteQuestion);

// ==================== Special 专题相关路由 ====================

/**
 * @api {get} /question/special/list 获取专题列表
 * @apiDescription 获取专题列表，支持分页和筛选
 * @apiName GetSpecialList
 * @apiGroup 专题
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} [current=1] 页码
 * @apiParam {Number} [pageSize=10] 每页数量
 * @apiParam {String} [keyword] 关键词搜索
 * @apiParam {Boolean} [isActive] 是否激活状态筛选
 * @apiParam {String} [sortBy=createdAt] 排序字段
 * @apiParam {String} [sortOrder=desc] 排序方式，asc或desc
 * 
 * @apiSuccess {Object[]} list 专题列表
 * @apiSuccess {Object} pagination 分页信息
 */
questionRoute.get('/special/list', QuestionController.getSpecialList);

/**
 * @api {get} /question/special/:id 获取专题详情
 * @apiDescription 根据ID获取专题的详细信息，包含题库信息
 * @apiName GetSpecialDetail
 * @apiGroup 专题
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id 专题ID
 * 
 * @apiSuccess {Object} special 专题详情
 * @apiSuccess {String} special.name 专题名称
 * @apiSuccess {String} special.icon 专题图标
 * @apiSuccess {String} special.description 专题描述
 * @apiSuccess {Object[]} special.questionBank 题库信息
 * @apiSuccess {Boolean} special.isActive 是否激活
 * @apiSuccess {Number} special.totalQuestions 题目总数
 */
questionRoute.get('/special/:id', QuestionController.getSpecialDetail);

/**
 * @api {post} /question/special/create 创建专题
 * @apiDescription 创建新的专题
 * @apiName CreateSpecial
 * @apiGroup 专题
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiBody {String} name 专题名称
 * @apiBody {String} [icon] 专题图标URL
 * @apiBody {String} [description] 专题描述
 * @apiBody {Boolean} [isActive=true] 是否激活
 * 
 * @apiSuccess {Object} special 创建的专题
 */
questionRoute.post('/special/create', authMiddleware, adminMiddleware, QuestionController.createSpecial);

/**
 * @api {patch} /question/special/:id 更新专题
 * @apiDescription 更新现有专题的信息
 * @apiName UpdateSpecial
 * @apiGroup 专题
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {String} id 专题ID
 * @apiBody {String} [name] 专题名称
 * @apiBody {String} [icon] 专题图标URL
 * @apiBody {String} [description] 专题描述
 * @apiBody {Boolean} [isActive] 是否激活
 * 
 * @apiSuccess {Object} special 更新后的专题
 */
questionRoute.patch('/special/:id', authMiddleware, adminMiddleware, QuestionController.updateSpecial);

/**
 * @api {delete} /question/special/:id 删除专题
 * @apiDescription 删除指定ID的专题
 * @apiName DeleteSpecial
 * @apiGroup 专题
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiParam {String} id 专题ID
 * 
 * @apiSuccess {Boolean} success 删除成功
 */
questionRoute.delete('/special/:id', authMiddleware, adminMiddleware, QuestionController.deleteSpecial);

/**
 * @api {post} /question/special/:id/questions 添加题目到专题
 * @apiDescription 将题目添加到指定专题的题库中
 * @apiName AddQuestionToSpecial
 * @apiGroup 专题
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {String} id 专题ID
 * @apiBody {String} questionId 题目ID
 * @apiBody {Number} [sort=0] 排序值
 * 
 * @apiSuccess {Object} special 更新后的专题
 */
questionRoute.post('/special/:id/questions', authMiddleware, adminMiddleware, QuestionController.addQuestionToSpecial);

/**
 * @api {delete} /question/special/:id/questions/:questionId 从专题中移除题目
 * @apiDescription 从指定专题的题库中移除题目
 * @apiName RemoveQuestionFromSpecial
 * @apiGroup 专题
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiParam {String} id 专题ID
 * @apiParam {String} questionId 题目ID
 * 
 * @apiSuccess {Object} special 更新后的专题
 */
questionRoute.delete('/special/:id/questions/:questionId', authMiddleware, adminMiddleware, QuestionController.removeQuestionFromSpecial);

/**
 * @api {patch} /question/special/:id/questions/:questionId/sort 更新题目排序
 * @apiDescription 更新专题中题目的排序
 * @apiName UpdateQuestionSort
 * @apiGroup 专题
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Bearer token，需要管理员权限
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {String} id 专题ID
 * @apiParam {String} questionId 题目ID
 * @apiBody {Number} sort 新的排序值
 * 
 * @apiSuccess {Object} special 更新后的专题
 */
questionRoute.patch('/special/:id/questions/:questionId/sort', authMiddleware, adminMiddleware, QuestionController.updateQuestionSort);

/**
 * @api {get} /question/special/:id/questions 获取专题下的题目列表
 * @apiDescription 根据专题ID获取该专题下的题目列表，支持分页、筛选和排序
 * @apiName GetSpecialQuestions
 * @apiGroup 专题
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} id 专题ID
 * @apiParam {Number} [current=1] 页码
 * @apiParam {Number} [pageSize=10] 每页数量
 * @apiParam {String} [category] 分类筛选
 * @apiParam {String} [tags] 标签筛选
 * @apiParam {Number} [difficulty] 难度筛选
 * @apiParam {String} [keyword] 关键词搜索
 * @apiParam {String} [sortBy=sort] 排序字段，可选值：sort(专题排序)、title、difficulty、createdAt等
 * @apiParam {String} [sortOrder=asc] 排序方式，asc或desc
 * 
 * @apiSuccess {Object[]} list 题目列表
 * @apiSuccess {Number} list.id 题目ID
 * @apiSuccess {String} list.title 题目标题
 * @apiSuccess {String} list.desc 题目描述
 * @apiSuccess {Number} list.difficulty 难度级别
 * @apiSuccess {String} list.category 题目分类
 * @apiSuccess {String} list.tags 题目标签
 * @apiSuccess {Number} list.specialSort 专题中的排序值
 * @apiSuccess {Object} pagination 分页信息
 * @apiSuccess {Number} pagination.total 总数
 * @apiSuccess {Number} pagination.current 当前页码
 * @apiSuccess {Number} pagination.pageSize 每页数量
 * @apiSuccess {Number} pagination.totalPages 总页数
 * @apiSuccess {Object} specialInfo 专题信息
 * @apiSuccess {String} specialInfo.id 专题ID
 * @apiSuccess {String} specialInfo.name 专题名称
 * @apiSuccess {String} specialInfo.description 专题描述
 * @apiSuccess {Number} specialInfo.totalQuestions 专题题目总数
 * 
 * @apiError {String} message 错误信息
 * @apiError {Number} code 错误代码
 */
questionRoute.get('/special/:id/questions', QuestionController.getSpecialQuestions);

export default questionRoute;
