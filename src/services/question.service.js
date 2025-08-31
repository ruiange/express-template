// question.service.js

import Question from '../models/question.model.js';
import Special from '../models/special.model.js';

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
  const question = await Question.findById(id, { __v: 0, updatedAt: 0 });

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

// ==================== Special 专题相关服务方法 ====================

/**
 * 获取专题列表
 * @param {Object} options - 查询选项
 * @param {number} options.current - 页码，默认为1
 * @param {number} options.pageSize - 每页数量，默认为10
 * @param {string} options.keyword - 关键词搜索
 * @param {boolean} options.isActive - 是否激活状态筛选
 * @param {string} options.sortBy - 排序字段
 * @param {string} options.sortOrder - 排序方式，asc或desc
 * @returns {Promise<Object>} - 包含专题列表和总数的对象
 */
export const getSpecialList = async (options = {}) => {
  const {
    current = 1,
    pageSize = 10,
    keyword,
    isActive,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;

  // 构建查询条件
  const query = {};

  if (isActive !== undefined) {
    query.isActive = isActive;
  }

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  // 构建排序条件
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // 计算分页
  const skip = (current - 1) * pageSize;

  // 执行查询
  const [specials, total] = await Promise.all([
    Special.find(query, { __v: 0 }).sort(sort).limit(pageSize).skip(skip),
    Special.countDocuments(query),
  ]);

  return {
    list: specials,
    pagination: {
      total,
      current,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

/**
 * 获取专题详情
 * @param {string} id - 专题ID
 * @returns {Promise<Object>} - 专题详情，包含题目信息
 */
export const getSpecialById = async (id) => {
  const special = await Special.findById(id, { __v: 0 }).populate(
    'questionBank.questionId',
    'title desc difficulty category tags createdAt'
  );

  if (!special) {
    throw new Error('专题不存在');
  }

  return special;
};

/**
 * 创建新专题
 * @param {Object} specialData - 专题数据
 * @returns {Promise<Object>} - 创建的专题对象
 */
export const createSpecial = async (specialData) => {
  try {
    // 检查名称是否已存在
    const existingSpecial = await Special.findOne({ name: specialData.name, isActive: true });
    if (existingSpecial) {
      throw new Error('专题名称已存在');
    }

    const newSpecial = new Special(specialData);
    await newSpecial.save();
    return newSpecial;
  } catch (error) {
    throw error;
  }
};

/**
 * 更新专题
 * @param {string} id - 专题ID
 * @param {Object} specialData - 更新的专题数据
 * @returns {Promise<Object>} - 更新后的专题对象
 */
export const updateSpecial = async (id, specialData) => {
  // 检查专题是否存在
  const existingSpecial = await Special.findById(id);
  if (!existingSpecial) {
    throw new Error('专题不存在');
  }

  // 如果更新名称，检查名称是否已被其他专题使用
  if (specialData.name && specialData.name !== existingSpecial.name) {
    const duplicateSpecial = await Special.findOne({
      name: specialData.name,
      isActive: true,
      _id: { $ne: id },
    });
    if (duplicateSpecial) {
      throw new Error('专题名称已存在');
    }
  }

  // 更新专题
  const updatedSpecial = await Special.findByIdAndUpdate(id, specialData, {
    new: true,
    runValidators: true,
  });

  return updatedSpecial;
};

/**
 * 删除专题
 * @param {string} id - 专题ID
 * @returns {Promise<boolean>} - 删除成功返回true
 */
export const deleteSpecial = async (id) => {
  // 检查专题是否存在
  const existingSpecial = await Special.findById(id);
  if (!existingSpecial) {
    throw new Error('专题不存在');
  }

  // 删除专题
  await Special.findByIdAndDelete(id);
  return true;
};

/**
 * 添加题目到专题
 * @param {string} specialId - 专题ID
 * @param {string} questionId - 题目ID
 * @param {number} sort - 排序值
 * @returns {Promise<Object>} - 更新后的专题对象
 */
export const addQuestionToSpecial = async (specialId, questionId, sort = 0) => {
  // 检查专题是否存在
  const special = await Special.findById(specialId);
  if (!special) {
    throw new Error('专题不存在');
  }

  // 检查题目是否存在
  const question = await Question.findById(questionId);
  if (!question) {
    throw new Error('题目不存在');
  }

  try {
    await special.addQuestion(questionId, sort);
    return await Special.findById(specialId).populate(
      'questionBank.questionId',
      'title desc difficulty category tags'
    );
  } catch (error) {
    throw error;
  }
};

/**
 * 从专题中移除题目
 * @param {string} specialId - 专题ID
 * @param {string} questionId - 题目ID
 * @returns {Promise<Object>} - 更新后的专题对象
 */
export const removeQuestionFromSpecial = async (specialId, questionId) => {
  // 检查专题是否存在
  const special = await Special.findById(specialId);
  if (!special) {
    throw new Error('专题不存在');
  }

  try {
    await special.removeQuestion(questionId);
    return await Special.findById(specialId).populate(
      'questionBank.questionId',
      'title desc difficulty category tags'
    );
  } catch (error) {
    throw error;
  }
};

/**
 * 更新题目排序
 * @param {string} specialId - 专题ID
 * @param {string} questionId - 题目ID
 * @param {number} sort - 新的排序值
 * @returns {Promise<Object>} - 更新后的专题对象
 */
export const updateQuestionSort = async (specialId, questionId, sort) => {
  // 检查专题是否存在
  const special = await Special.findById(specialId);
  if (!special) {
    throw new Error('专题不存在');
  }

  try {
    await special.updateQuestionSort(questionId, sort);
    return await Special.findById(specialId).populate(
      'questionBank.questionId',
      'title desc difficulty category tags'
    );
  } catch (error) {
    throw error;
  }
};

/**
 * 获取专题下的题目列表
 * @param {string} specialId - 专题ID
 * @param {Object} options - 查询选项
 * @param {number} options.current - 页码，默认为1
 * @param {number} options.pageSize - 每页数量，默认为10
 * @param {string} options.category - 分类筛选
 * @param {string} options.tags - 标签筛选
 * @param {number} options.difficulty - 难度筛选
 * @param {string} options.keyword - 关键词搜索
 * @param {string} options.sortBy - 排序字段，默认为sort
 * @param {string} options.sortOrder - 排序方式，默认为asc
 * @returns {Promise<Object>} - 包含题目列表和总数的对象
 */
export const getSpecialQuestions = async (specialId, options = {}) => {
  const {
    current = 1,
    pageSize = 10,
    category,
    tags,
    difficulty,
    keyword,
    sortBy = 'sort',
    sortOrder = 'asc',
  } = options;

  // 检查专题是否存在
  const special = await Special.findById(specialId);
  if (!special) {
    throw new Error('专题不存在');
  }

  // 构建题目查询条件
  const questionQuery = {};
  
  if (category) {
    questionQuery.category = category;
  }

  if (tags) {
    questionQuery.tags = { $regex: tags, $options: 'i' };
  }

  if (difficulty) {
    questionQuery.difficulty = difficulty;
  }

  if (keyword) {
    questionQuery.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { desc: { $regex: keyword, $options: 'i' } },
    ];
  }

  // 获取专题的题目ID列表
  const questionIds = special.questionBank.map(item => item.questionId);
  
  if (questionIds.length === 0) {
    return {
      list: [],
      pagination: {
        total: 0,
        current,
        pageSize,
        totalPages: 0,
      },
      specialInfo: {
        id: special._id,
        name: special.name,
        description: special.description,
        totalQuestions: 0,
      },
    };
  }

  // 添加专题题目ID筛选条件
  questionQuery._id = { $in: questionIds };

  // 执行题目查询
  const [questions, total] = await Promise.all([
    Question.find(questionQuery, { __v: 0, createdAt: 0, updatedAt: 0, analysis: 0, answer: 0 }),
    Question.countDocuments(questionQuery),
  ]);

  // 根据专题中的排序重新排列题目
  const questionMap = new Map();
  questions.forEach(q => questionMap.set(q._id.toString(), q));

  const sortedQuestions = special.questionBank
    .filter(item => questionMap.has(item.questionId.toString()))
    .map(item => ({
      ...questionMap.get(item.questionId.toString()).toObject(),
      specialSort: item.sort, // 添加专题中的排序字段
    }));

  // 根据排序选项排序
  if (sortBy === 'sort' || sortBy === 'specialSort') {
    sortedQuestions.sort((a, b) => {
      return sortOrder === 'asc' ? a.specialSort - b.specialSort : b.specialSort - a.specialSort;
    });
  } else {
    sortedQuestions.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });
  }

  // 分页处理
  const skip = (current - 1) * pageSize;
  const paginatedQuestions = sortedQuestions.slice(skip, skip + pageSize);

  return {
    list: paginatedQuestions,
    pagination: {
      total,
      current,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
    specialInfo: {
      id: special._id,
      name: special.name,
      description: special.description,
      totalQuestions: sortedQuestions.length,
    },
  };
};

export default {
  getQuestionList,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  batchDeleteQuestions,
  // Special 专题相关方法
  getSpecialList,
  getSpecialById,
  createSpecial,
  updateSpecial,
  deleteSpecial,
  addQuestionToSpecial,
  removeQuestionFromSpecial,
  updateQuestionSort,
  getSpecialQuestions,
};
