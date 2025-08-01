// question.service.js

import { questionTable } from '../db/schemas/question.schema.js';
import { eq, asc, desc, like, or, sql, inArray } from 'drizzle-orm';
import { db } from '../config/db.js';

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
    sortOrder = 'desc'
  } = options;

  // 构建查询条件
  let query = db.select().from(questionTable);
  let countQuery = db.select({ count: sql`count(*)` }).from(questionTable);

  // 应用筛选条件
  const whereConditions = [];

  if (category) {
    whereConditions.push(eq(questionTable.category, category));
  }

  if (tags) {
    whereConditions.push(like(questionTable.tags, `%${tags}%`));
  }

  if (difficulty) {
    whereConditions.push(eq(questionTable.difficulty, difficulty));
  }

  if (keyword) {
    whereConditions.push(
      or(
        like(questionTable.title, `%${keyword}%`),
        like(questionTable.content, `%${keyword}%`)
      )
    );
  }

  if (whereConditions.length > 0) {
    query = query.where(whereConditions.reduce((acc, condition) => acc ? sql`${acc} AND ${condition}` : condition));
    countQuery = countQuery.where(whereConditions.reduce((acc, condition) => acc ? sql`${acc} AND ${condition}` : condition));
  }

  // 应用排序
  const sortColumn = questionTable[sortBy] || questionTable.createdAt;
  if (sortOrder.toLowerCase() === 'asc') {
    query = query.orderBy(asc(sortColumn));
  } else {
    query = query.orderBy(desc(sortColumn));
  }

  // 应用分页
  const offset = (current - 1) * pageSize;
  query = query.limit(pageSize).offset(offset);

  // 执行查询
  const [questions, countResult] = await Promise.all([
    query.execute(),
    countQuery.execute()
  ]);

  const total = Number(countResult[0]?.count || '0');

  return {
    list:questions,
    pagination: {
      total,
      current,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  };
};

/**
 * 获取题目详情
 * @param {number} id - 题目ID
 * @returns {Promise<Object>} - 题目详情
 */
export const getQuestionById = async (id) => {
  const question = await db
    .select()
    .from(questionTable)
    .where(eq(questionTable.id, id))
    .execute();

  if (!question || question.length === 0) {
    throw new Error('题目不存在');
  }

  return question[0];
};

/**
 * 创建新题目
 * @param {Object} questionData - 题目数据
 * @returns {Promise<Object>} - 创建的题目对象
 */
export const createQuestion = async (questionData) => {
  try {
    const [newQuestion] = await db
      .insert(questionTable)
      .values({
        ...questionData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning()
      .execute();

    return newQuestion;
  } catch (error) {
    throw error;
  }
};

/**
 * 更新题目
 * @param {number} id - 题目ID
 * @param {Object} questionData - 更新的题目数据
 * @returns {Promise<Object>} - 更新后的题目对象
 */
export const updateQuestion = async (id, questionData) => {
  // 检查题目是否存在
  const existingQuestion = await db
    .select()
    .from(questionTable)
    .where(eq(questionTable.id, id))
    .execute();

  if (!existingQuestion || existingQuestion.length === 0) {
    throw new Error('题目不存在');
  }

  // 更新题目
  const [updatedQuestion] = await db
    .update(questionTable)
    .set({
      ...questionData,
      updatedAt: new Date()
    })
    .where(eq(questionTable.id, id))
    .returning()
    .execute();

  return updatedQuestion;
};

/**
 * 删除题目
 * @param {number} id - 题目ID
 * @returns {Promise<boolean>} - 删除成功返回true
 */
export const deleteQuestion = async (id) => {
  // 检查题目是否存在
  const existingQuestion = await db
    .select()
    .from(questionTable)
    .where(eq(questionTable.id, id))
    .execute();

  if (!existingQuestion || existingQuestion.length === 0) {
    throw new Error('题目不存在');
  }

  // 删除题目
  await db
    .delete(questionTable)
    .where(eq(questionTable.id, id))
    .execute();

  return true;
};

/**
 * 批量删除题目
 * @param {number[]} ids - 题目ID数组
 * @returns {Promise<Object>} - 删除结果对象
 */
export const batchDeleteQuestions = async (ids) => {
  try {
    // 检查哪些题目存在
    const existingQuestions = await db
      .select({ id: questionTable.id })
      .from(questionTable)
      .where(inArray(questionTable.id, ids))
      .execute();

    const existingIds = existingQuestions.map(q => q.id);
    const failedIds = ids.filter(id => !existingIds.includes(id));

    let deletedCount = 0;
    if (existingIds.length > 0) {
      // 批量删除存在的题目
      const deleteResult = await db
        .delete(questionTable)
        .where(inArray(questionTable.id, existingIds))
        .execute();
      
      deletedCount = existingIds.length;
    }

    return {
      success: true,
      deletedCount,
      failedIds
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
  batchDeleteQuestions
};