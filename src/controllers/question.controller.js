// question.controller.js
import questionService from '../services/question.service.js';
import commentService from '../services/comment.service.js';
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

  static async getTodayQuestion(req,res){

  }

  // ==================== Special 专题相关方法 ====================

  /**
   * 获取专题列表
   * @param {Object} req - 请求对象
   * @param {Object} req.query - 查询参数
   * @param {number} req.query.current - 当前页码，默认为1
   * @param {number} req.query.pageSize - 每页数量，默认为10
   * @param {string} req.query.keyword - 搜索关键词
   * @param {boolean} req.query.isActive - 是否激活状态
   * @param {string} req.query.sortBy - 排序字段，默认为createdAt
   * @param {string} req.query.sortOrder - 排序方式，默认为desc
   * @param {Object} res - 响应对象
   * @returns {Object} 返回专题列表数据
   */
  static async getSpecialList(req, res) {
    try {
      const options = {
        current: parseInt(req.query.current) || 1,
        pageSize: parseInt(req.query.pageSize) || 10,
        keyword: req.query.keyword,
        isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined,
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc',
      };

      const result = await questionService.getSpecialList(options);
      res.success(result);
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 获取专题详情
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 专题ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回专题详情数据
   */
  static async getSpecialDetail(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.error('无效的专题ID');
      }

      const special = await questionService.getSpecialById(id);
      res.success(special);
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 创建新专题
   * @param {Object} req - 请求对象
   * @param {Object} req.body - 请求体
   * @param {string} req.body.name - 专题名称（必填）
   * @param {string} req.body.icon - 专题图标URL
   * @param {string} req.body.description - 专题描述
   * @param {boolean} req.body.isActive - 是否激活
   * @param {Object} res - 响应对象
   * @returns {Object} 返回创建的专题数据
   */
  static async createSpecial(req, res) {
    try {
      const { name } = req.body;
      // 验证必填字段
      if (!name) {
        return res.error('专题名称为必填项');
      }

      const newSpecial = await questionService.createSpecial(req.body);
      res.created(newSpecial, '专题创建成功');
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 更新专题信息
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 专题ID
   * @param {Object} req.body - 请求体
   * @param {string} req.body.name - 专题名称
   * @param {string} req.body.icon - 专题图标URL
   * @param {string} req.body.description - 专题描述
   * @param {boolean} req.body.isActive - 是否激活
   * @param {Object} res - 响应对象
   * @returns {Object} 返回更新后的专题数据
   */
  static async updateSpecial(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.error('无效的专题ID');
      }

      const { name, icon, description, isActive } = req.body;

      // 至少需要一个更新字段
      if (!name && !icon && !description && isActive === undefined) {
        return res.error('至少需要提供一个更新字段');
      }

      const updatedSpecial = await questionService.updateSpecial(id, req.body);
      res.success(updatedSpecial, '专题更新成功');
    } catch (error) {
      if (error.message === '专题不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * 删除专题
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 专题ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回删除操作结果
   */
  static async deleteSpecial(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.error('无效的专题ID');
      }

      await questionService.deleteSpecial(id);
      res.success(true, '专题删除成功');
    } catch (error) {
      if (error.message === '专题不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * 添加题目到专题
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 专题ID
   * @param {Object} req.body - 请求体
   * @param {string} req.body.questionId - 题目ID
   * @param {number} req.body.sort - 排序值
   * @param {Object} res - 响应对象
   * @returns {Object} 返回更新后的专题数据
   */
  static async addQuestionToSpecial(req, res) {
    try {
      const { id } = req.params;
      const { questionId, sort = 0 } = req.body;

      if (!id || !questionId) {
        return res.error('专题ID和题目ID为必填项');
      }

      const updatedSpecial = await questionService.addQuestionToSpecial(id, questionId, sort);
      res.success(updatedSpecial, '题目添加成功');
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 从专题中移除题目
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 专题ID
   * @param {string} req.params.questionId - 题目ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回更新后的专题数据
   */
  static async removeQuestionFromSpecial(req, res) {
    try {
      const { id, questionId } = req.params;

      if (!id || !questionId) {
        return res.error('专题ID和题目ID为必填项');
      }

      const updatedSpecial = await questionService.removeQuestionFromSpecial(id, questionId);
      res.success(updatedSpecial, '题目移除成功');
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 更新题目排序
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 专题ID
   * @param {string} req.params.questionId - 题目ID
   * @param {Object} req.body - 请求体
   * @param {number} req.body.sort - 新的排序值
   * @param {Object} res - 响应对象
   * @returns {Object} 返回更新后的专题数据
   */
  static async updateQuestionSort(req, res) {
    try {
      const { id, questionId } = req.params;
      const { sort } = req.body;

      if (!id || !questionId || sort === undefined) {
        return res.error('专题ID、题目ID和排序值为必填项');
      }

      const updatedSpecial = await questionService.updateQuestionSort(id, questionId, sort);
      res.success(updatedSpecial, '排序更新成功');
    } catch (error) {
      res.error(error.message);
    }
  }

  /**
   * 获取专题下的题目列表
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 专题ID
   * @param {Object} req.query - 查询参数
   * @param {number} req.query.current - 当前页码，默认为1
   * @param {number} req.query.pageSize - 每页数量，默认为10
   * @param {string} req.query.category - 分类筛选
   * @param {string} req.query.tags - 标签筛选
   * @param {number} req.query.difficulty - 难度筛选
   * @param {string} req.query.keyword - 关键词搜索
   * @param {string} req.query.sortBy - 排序字段，默认为sort
   * @param {string} req.query.sortOrder - 排序方式，默认为asc
   * @param {Object} res - 响应对象
   * @returns {Object} 返回专题题目列表数据
   */
  static async getSpecialQuestions(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.error('无效的专题ID');
      }

      const options = {
        current: parseInt(req.query.current) || 1,
        pageSize: parseInt(req.query.pageSize) || 10,
        category: req.query.category,
        tags: req.query.tags,
        difficulty: req.query.difficulty ? parseInt(req.query.difficulty) : undefined,
        keyword: req.query.keyword,
        sortBy: req.query.sortBy || 'sort',
        sortOrder: req.query.sortOrder || 'asc',
      };

      const result = await questionService.getSpecialQuestions(id, options);
      res.success(result);
    } catch (error) {
      if (error.message === '专题不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  // ==================== Comment 评论相关方法 ====================

  /**
   * 获取题目评论列表
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 题目ID
   * @param {Object} req.query - 查询参数
   * @param {number} req.query.current - 当前页码，默认为1
   * @param {number} req.query.pageSize - 每页数量，默认为10
   * @param {string} req.query.sortBy - 排序字段，默认为createdAt
   * @param {string} req.query.sortOrder - 排序方式，默认为desc
   * @param {Object} res - 响应对象
   * @returns {Object} 返回评论列表数据
   */
  static async getQuestionComments(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.error('无效的题目ID');
      }

      const options = {
        current: parseInt(req.query.current) || 1,
        pageSize: parseInt(req.query.pageSize) || 10,
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc',
      };

      const result = await commentService.getQuestionComments(id, options);
      res.success(result);
    } catch (error) {
      if (error.message === '题目不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * 创建评论
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.id - 题目ID
   * @param {Object} req.body - 请求体
   * @param {string} req.body.content - 评论内容
   * @param {string} [req.body.parentId] - 父评论ID（回复时使用）
   * @param {Object} req.user - 用户信息（来自认证中间件）
   * @param {string} req.user.id - 用户ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回创建的评论数据
   */
  static async createComment(req, res) {
    try {
      const { id } = req.params;
      const { content, parentId } = req.body;
      const userId = req.user.id;

      // 验证必填字段
      if (!content || content.trim().length === 0) {
        return res.error('评论内容不能为空');
      }

      if (content.length > 1000) {
        return res.error('评论内容不能超过1000字符');
      }

      const commentData = {
        content: content.trim(),
        parentId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      };

      const newComment = await commentService.createComment(id, userId, commentData);
      res.created(newComment, '评论创建成功');
    } catch (error) {
      if (error.message === '题目不存在' || error.message === '父评论不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * 更新评论
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.commentId - 评论ID
   * @param {Object} req.body - 请求体
   * @param {string} req.body.content - 新的评论内容
   * @param {Object} req.user - 用户信息（来自认证中间件）
   * @param {string} req.user.id - 用户ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回更新后的评论数据
   */
  static async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const userId = req.user.id;

      if (!commentId) {
        return res.error('无效的评论ID');
      }

      // 验证必填字段
      if (!content || content.trim().length === 0) {
        return res.error('评论内容不能为空');
      }

      if (content.length > 1000) {
        return res.error('评论内容不能超过1000字符');
      }

      const updateData = { content: content.trim() };
      const updatedComment = await commentService.updateComment(commentId, userId, updateData);
      res.success(updatedComment, '评论更新成功');
    } catch (error) {
      if (error.message === '评论不存在') {
        res.error(error.message, 404);
      } else if (error.message === '只能修改自己的评论' || error.message === '该评论无法修改') {
        res.error(error.message, 403);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * 删除评论
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.commentId - 评论ID
   * @param {Object} req.user - 用户信息（来自认证中间件）
   * @param {string} req.user.id - 用户ID
   * @param {string} req.user.role - 用户角色
   * @param {Object} res - 响应对象
   * @returns {Object} 返回删除操作结果
   */
  static async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;
      const isAdmin = req.user.role === 'admin';

      if (!commentId) {
        return res.error('无效的评论ID');
      }

      await commentService.deleteComment(commentId, userId, isAdmin);
      res.success(true, '评论删除成功');
    } catch (error) {
      if (error.message === '评论不存在') {
        res.error(error.message, 404);
      } else if (error.message === '没有权限删除该评论') {
        res.error(error.message, 403);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * 点赞评论
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.commentId - 评论ID
   * @param {Object} req.user - 用户信息（来自认证中间件）
   * @param {string} req.user.id - 用户ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回点赞操作结果
   */
  static async likeComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;

      if (!commentId) {
        return res.error('无效的评论ID');
      }

      const result = await commentService.likeComment(commentId, userId);
      res.success(result, '点赞成功');
    } catch (error) {
      if (error.message === '评论不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * 踩评论
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.commentId - 评论ID
   * @param {Object} req.user - 用户信息（来自认证中间件）
   * @param {string} req.user.id - 用户ID
   * @param {Object} res - 响应对象
   * @returns {Object} 返回踩操作结果
   */
  static async dislikeComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;

      if (!commentId) {
        return res.error('无效的评论ID');
      }

      const result = await commentService.dislikeComment(commentId, userId);
      res.success(result, '操作成功');
    } catch (error) {
      if (error.message === '评论不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }

  /**
   * 置顶/取消置顶评论
   * @param {Object} req - 请求对象
   * @param {Object} req.params - 路径参数
   * @param {string} req.params.commentId - 评论ID
   * @param {Object} req.body - 请求体
   * @param {boolean} req.body.isTop - 是否置顶
   * @param {Object} res - 响应对象
   * @returns {Object} 返回更新后的评论数据
   */
  static async topComment(req, res) {
    try {
      const { commentId } = req.params;
      const { isTop } = req.body;

      if (!commentId) {
        return res.error('无效的评论ID');
      }

      if (typeof isTop !== 'boolean') {
        return res.error('isTop参数必须为布尔值');
      }

      const updatedComment = await commentService.topComment(commentId, isTop);
      res.success(updatedComment, isTop ? '评论置顶成功' : '取消置顶成功');
    } catch (error) {
      if (error.message === '评论不存在') {
        res.error(error.message, 404);
      } else {
        res.error(error.message);
      }
    }
  }
}

export default QuestionController;
