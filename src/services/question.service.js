// question.service.js

import Question from '../models/question.model.js';

/**
 * 获取题库列表
 * @param {Object} options - 查询选项
 * @param {number} options.current - 页码，默认为1
 * @param {number} options.pageSize - 每页数量，默认为10
 * @param {string} options.category - 分类筛选
 * @param {string} options.tags - 标签筛选
 * @param {number} options.difficulty - 难度筛选
 * @param {string} options.keyword - 关键词搜索
 * @param {string} options.sortBy - 排序字段
 * @param {string} options.sortOrder - 排序方式，asc或desc
 * @returns {Promise<Object>} - 包含题目列表和总数的对象
 */
export const getQuestionList = async (options = {}) => {
  const {
    current = 1,
    pageSize = 10,
    category,
    tags,
    difficulty,
    keyword,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;

  // 构建查询条件
  const query = {};

  if (category) {
    query.category = category;
  }

  if (tags) {
    query.tags = { $regex: tags, $options: 'i' };
  }

  if (difficulty) {
    query.difficulty = difficulty;
  }

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { desc: { $regex: keyword, $options: 'i' } },
    ];
  }

  // 构建排序条件
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // 计算分页
  const skip = (current - 1) * pageSize;

  // 执行查询
  const [questions, total] = await Promise.all([
    Question.find(query, { __v: 0, createdAt: 0, updatedAt: 0, analysis: 0, answer: 0 })
      .sort(sort)
      .limit(pageSize)
      .skip(skip),
    Question.countDocuments(query),
  ]);

  return {
    list: questions,
    pagination: {
      total,
      current,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

/**
 * 获取题目详情
 * @param {string} id - 题目ID
 * @returns {Promise<Object>} - 题目详情
 */
export const getQuestionById = async (id) => {
  const question = await Question.findById(id, { __v: 0,  updatedAt: 0 });

  if (!question) {
    throw new Error('题目不存在');
  }

  return question;
};

/**
 * 创建新题目
 * @param {Object} questionData - 题目数据
 * @returns {Promise<Object>} - 创建的题目对象
 */
export const createQuestion = async (questionData) => {
  try {
    const newQuestion = new Question(questionData);
    await newQuestion.save();
    return newQuestion;
  } catch (error) {
    throw error;
  }
};

/**
 * 更新题目
 * @param {string} id - 题目ID
 * @param {Object} questionData - 更新的题目数据
 * @returns {Promise<Object>} - 更新后的题目对象
 */
export const updateQuestion = async (id, questionData) => {
  // 检查题目是否存在
  const existingQuestion = await Question.findById(id);

  if (!existingQuestion) {
    throw new Error('题目不存在');
  }

  // 更新题目
  const updatedQuestion = await Question.findByIdAndUpdate(id, questionData, {
    new: true,
    runValidators: true,
  });

  return updatedQuestion;
};

/**
 * 删除题目
 * @param {string} id - 题目ID
 * @returns {Promise<boolean>} - 删除成功返回true
 */
export const deleteQuestion = async (id) => {
  // 检查题目是否存在
  const existingQuestion = await Question.findById(id);

  if (!existingQuestion) {
    throw new Error('题目不存在');
  }

  // 删除题目
  await Question.findByIdAndDelete(id);

  return true;
};

/**
 * 批量删除题目
 * @param {string[]} ids - 题目ID数组
 * @returns {Promise<Object>} - 删除结果对象
 */
export const batchDeleteQuestions = async (ids) => {
  try {
    // 检查哪些题目存在
    const existingQuestions = await Question.find({ _id: { $in: ids } }).select('_id');

    const existingIds = existingQuestions.map((q) => q._id.toString());
    const failedIds = ids.filter((id) => !existingIds.includes(id));

    let deletedCount = 0;
    if (existingIds.length > 0) {
      // 批量删除存在的题目
      const deleteResult = await Question.deleteMany({ _id: { $in: existingIds } });
      deletedCount = deleteResult.deletedCount;
    }

    return {
      success: true,
      deletedCount,
      failedIds,
    };
  } catch (error) {
    throw new Error(`批量删除失败: ${error.message}`);
  }
};

export default {
  getQuestionList,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  batchDeleteQuestions,
};
