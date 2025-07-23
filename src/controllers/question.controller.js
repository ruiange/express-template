// question.controller.js
import questionService from '../services/question.service.js';

class QuestionController {
  /**
   * @api {get} /api/question/list 获取题库列表
   * @apiName GetQuestionList
   * @apiGroup Question
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
  static async getQuestionList(req, res) {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        category: req.query.category,
        tags: req.query.tags,
        difficulty: req.query.difficulty ? parseInt(req.query.difficulty) : undefined,
        keyword: req.query.keyword,
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc'
      };


      const result = await questionService.getQuestionList(options);
      res.success(result);
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * @api {get} /api/question/:id 获取题目详情
   * @apiName GetQuestionDetail
   * @apiGroup Question
   * @apiVersion 1.0.0
   * 
   * @apiParam {Number} id 题目ID
   * 
   * @apiSuccess {Object} question 题目详情
   */
  static async getQuestionDetail(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.error('无效的题目ID');
      }

      const question = await questionService.getQuestionById(id);
      res.success(question);
    } catch (error) {
      if (error.message === '题目不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * @api {post} /api/question/create 创建题目
   * @apiName CreateQuestion
   * @apiGroup Question
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
   */
  static async createQuestion(req, res) {
    try {
      const { title, content, answer, difficulty, category, tags } = req.body;

      // 验证必填字段
      if (!title || !content || !answer) {
        return res.error('标题、内容和答案为必填项');
      }

      const questionData = {
        title,
        content,
        answer,
        difficulty: difficulty || 3,
        category,
        tags
      };

      const newQuestion = await questionService.createQuestion(questionData);
      res.created(newQuestion, '题目创建成功');
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * @api {put} /api/question/:id 更新题目
   * @apiName UpdateQuestion
   * @apiGroup Question
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
   */
  static async updateQuestion(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.error('无效的题目ID');
      }

      const { title, content, answer, difficulty, category, tags } = req.body;

      // 至少需要一个更新字段
      if (!title && !content && !answer && difficulty === undefined && !category && !tags) {
        return res.error('至少需要提供一个更新字段');
      }

      const questionData = {};
      if (title) questionData.title = title;
      if (content) questionData.content = content;
      if (answer) questionData.answer = answer;
      if (difficulty !== undefined) questionData.difficulty = difficulty;
      if (category) questionData.category = category;
      if (tags) questionData.tags = tags;

      const updatedQuestion = await questionService.updateQuestion(id, questionData);
      res.success(updatedQuestion, '题目更新成功');
    } catch (error) {
      if (error.message === '题目不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * @api {delete} /api/question/:id 删除题目
   * @apiName DeleteQuestion
   * @apiGroup Question
   * @apiVersion 1.0.0
   * 
   * @apiParam {Number} id 题目ID
   * 
   * @apiSuccess {Boolean} success 删除成功
   */
  static async deleteQuestion(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.error('无效的题目ID');
      }

      await questionService.deleteQuestion(id);
      res.success(true, '题目删除成功');
    } catch (error) {
      if (error.message === '题目不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }
}

export default QuestionController;
