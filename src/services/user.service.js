// user.service.js

import { userTable } from '../db/schemas/user.schema.js';
import { eq, asc, like, or, sql } from 'drizzle-orm';
import { db } from '../config/db.js';
import chalk from 'chalk';

/**
 * 用户注册服务
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<Object>} - 注册的用户对象
 */
export const registerUser = async (username, password) => {
  // 检查用户是否已存在
  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .execute();
  if (existingUser.length > 0) {
    throw new Error('用户名或邮箱已被使用');
  }

  // 创建新用户
  const user = await db
    .insert(userTable)
    .values({
      username,
      password, // 注意：实际应用中需要对密码进行加密
    })
    .returning()
    .execute();
  return user[0];
};

/**
 * 创建用户
 * @param {Object} userData - 用户数据
 * @returns {Promise<Object>} - 创建的用户对象
 */
export const createUser = async (userData) => {
  try {
    const [newUser] = await db.insert(userTable).values(userData).returning().execute();
    return newUser;
  } catch (error) {
    throw error;
  }
};

/**
 * 根据ID获取用户
 * @param {number} id - 用户ID
 * @returns {Promise<Object>} - 用户对象
 */
export const getUserById = async (id) => {
  try {
    const user = await db.select().from(userTable).where(eq(userTable.id, id)).execute();
    if (!user[0]) {
      return null;
    }
    const { createdAt, updatedAt, password, ...rest } = user[0];
    return rest;
  } catch (error) {
    throw error;
  }
};

/**
 * 根据openid获取用户
 * @param {string} openid - 微信开放平台唯一标识
 * @param {Object} projection - 需要返回的字段（可选）
 * @returns {Promise<Object>} - 用户对象
 */
export const getUserByOpenid = async (openid) => {
  try {
    const user = await db.select().from(userTable).where(eq(userTable.openid, openid)).execute();
    if (!user[0]) {
      return null;
    }
    const { createdAt, updatedAt, password, ...rest } = user[0];
    return rest;
  } catch (error) {
    throw error;
  }
};

/**
 * 获取所有用户（支持分页和搜索）
 * @param {Object} options - 查询选项
 * @param {number} options.page - 页码，默认为1
 * @param {number} options.limit - 每页数量，默认为10
 * @param {string} options.search - 搜索关键词
 * @returns {Promise<Object>} - 用户列表和分页信息
 */
export const getAllUsers = async (options = {}) => {
  try {
    const { page = 1, limit = 10, search = '', role, membership } = options;
    const offset = (page - 1) * limit;

    console.log(chalk.yellow('getAllUsers 参数:', { page, limit, search, role, membership, offset }));

    let query = db.select().from(userTable);

    // 构建查询条件
    const conditions = [];
    
    // 如果有搜索关键词，添加搜索条件
    if (search) {
      conditions.push(
        or(
          like(userTable.username, `%${search}%`),
          like(userTable.nickname, `%${search}%`),
          like(userTable.email, `%${search}%`)
        )
      );
    }

    // 添加角色筛选条件
    if (role) {
      conditions.push(eq(userTable.role, role));
    }

    // 添加会员等级筛选条件
    if (membership !== undefined && membership !== '') {
      conditions.push(eq(userTable.membership, parseInt(membership)));
    }

    // 应用所有条件
    if (conditions.length > 0) {
      query = query.where(...conditions);
    }

    // 构建计数查询条件
    let countQuery = db.select({ count: sql`count(*)` }).from(userTable);
    if (conditions.length > 0) {
      countQuery = countQuery.where(...conditions);
    }

    console.log(chalk.yellow('执行计数查询...'));
    const [{ count }] = await countQuery.execute();
    console.log(chalk.yellow('总记录数:', count));

    // 获取分页数据
    console.log(chalk.yellow('执行分页查询...'));
    const users = await query.orderBy(asc(userTable.id)).limit(limit).offset(offset).execute();

    console.log(chalk.yellow('查询到的用户数量:', users.length));
    if (users.length > 0) {
      console.log(
        chalk.yellow('第一个用户示例:', {
          id: users[0].id,
          username: users[0].username,
          email: users[0].email,
        })
      );
    }

    return {
      users,
      pagination: {
        current: page,
        pageSize: limit,
        total: parseInt(count),
        totalPages: Math.ceil(parseInt(count) / limit),
      },
    };
  } catch (error) {
    console.log(chalk.red('getAllUsers 错误:', error.message));
    console.log(chalk.red('错误堆栈:', error.stack));
    throw error;
  }
};

/**
 * 更新用户信息
 * @param {number} id - 用户ID
 * @param {Object} userData - 需要更新的用户数据
 * @returns {Promise<Object>} - 更新后的用户对象
 */
export const updateUser = async (id, userData) => {
  try {
    const updatedUser = await db
      .update(userTable)
      .set(userData)
      .where(eq(userTable.id, id))
      .returning()
      .execute();
    return updatedUser[0];
  } catch (error) {
    throw error;
  }
};

/**
 * 删除用户
 * @param {number} id - 用户ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (id) => {
  try {
    await db.delete(userTable).where(eq(userTable.id, id)).execute();
  } catch (error) {
    throw error;
  }
};


/**
 * 获取用户信息
 * @param {Object} user - 用户对象 {id} || {openid}
 * @returns {Promise<Object>} - 用户信息
 */
export const getUserInfo = async (user) => {
  const id = user.id || null;
  const openid = user.openid || null;
  let info = null;

  if (id) {
    info = await getUserById(id);
  } else {
    info = await getUserByOpenid(openid);
  }
  return info;
};
