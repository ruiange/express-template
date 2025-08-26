// question.controller.js
import questionService from '../services/question.service.js';
import { marked } from 'marked';
import md2HtmlUtil from '../utils/md2Html.util.js';

class QuestionController {
  /**
   * 获取题目列表
   * @param {Object} req - 请求对象
   * @param {Object} req.query - 查询参数
   * @param {number} req.query.current - 当前页码，默认为1
   * @param {number} req.query.pageSize - 每页数量，默认为10
   * @param {string} req.query.category - 题目分类
   * @param {string} req.query.tags - 题目标签
   * @param {number} req.query.difficulty - 题目难度
   * @param {string} req.query.keyword - 搜索关键词
   * @param {string} req.query.sortBy - 排序字段，默认为createdAt
   * @param {string} req.query.sortOrder - 排序方式，默认为desc
   * @param {Object} res - 响应对象
   * @returns {Object} 返回题目列表数据
   */
  static async getQuestionList(req, res) {
    try {
      const options = {
        current: parseInt(req.query.current) || 1,
        pageSize: parseInt(req.query.pageSize) || 10,
        category: req.query.category,
        tags: req.query.tags,
        difficulty: req.query.difficulty ? parseInt(req.query.difficulty) : undefined,
        keyword: req.query.keyword,
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc',
      };

      const result = await questionService.getQuestionList(options);
      res.success(result);
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 获取题目详情
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 题目ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回题目详情数据，答案会被转换为HTML格式
   */
  static async getQuestionDetail(req, res) {
    try {
      const { id } = req.params;
      const {mini=false} = req.query;
      if (!id) {
        return res.error('无效的题目ID');
      }

      console.log('mini',mini)
      const question = await questionService.getQuestionById(id);

      if (mini) {
        question.desc = await md2HtmlUtil(question.desc);
        question.answer = await md2HtmlUtil(question.answer);
        question.analysis = await md2HtmlUtil(question.analysis);
      }

      res.success(question);
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 创建新题目
   * @param {Object} req - 请求对象
   * @param {Object} req.body - 请求体
   * @param {string} req.body.title - 题目标题（必填）
   * @param {string} req.body.content - 题目内容
   * @param {string} req.body.answer - 题目答案
   * @param {number} req.body.difficulty - 题目难度
   * @param {string} req.body.category - 题目分类
   * @param {string} req.body.tags - 题目标签
   * @param {Object} res - 响应对象
   * @returns {Object} 返回创建的题目数据
   */
  static async createQuestion(req, res) {
    try {
      const { title } = req.body;
      // 验证必填字段
      if (!title) {
        return res.error('标题必填项');
      }

      const newQuestion = await questionService.createQuestion(req.body);
      res.created(newQuestion, '题目创建成功');
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 更新题目信息
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 题目ID
   * @param {Object} req.body - 请求体
   * @param {string} req.body.title - 题目标题
   * @param {string} req.body.content - 题目内容
   * @param {string} req.body.answer - 题目答案
   * @param {number} req.body.difficulty - 题目难度
   * @param {string} req.body.category - 题目分类
   * @param {string} req.body.tags - 题目标签
   * @param {Object} res - 响应对象
   * @returns {Object} 返回更新后的题目数据
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

      const questionData = req.body;

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
   * 删除单个题目
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 题目ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回删除操作结果
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

  /**
   * 批量删除题目
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  static async batchDeleteQuestions(req, res) {
    try {
      const { ids } = req.body;

      // 验证参数
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.error('请提供有效的题目ID数组');
      }

      // 验证所有ID都是数字
      const validIds = ids.filter((id) => Number.isInteger(id) && id > 0);
      if (validIds.length === 0) {
        return res.error('请提供有效的题目ID');
      }

      const result = await questionService.batchDeleteQuestions(validIds);
      res.success(result, '批量删除操作完成');
    } catch (error) {
      res.error(error.message);
    }
  }
}

export default QuestionController;
