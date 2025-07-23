// question.controller.js
import questionService from '../services/question.service.js';

class QuestionController {
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
        sortOrder: req.query.sortOrder || 'desc',
      };

      const result = await questionService.getQuestionList(options);
      res.success(result);
    } catch (error) {
      res.error(error.message);
    }
  }

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
        tags,
      };

      const newQuestion = await questionService.createQuestion(questionData);
      res.created(newQuestion, '题目创建成功');
    } catch (error) {
      res.error(error.message);
    }
  }

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
