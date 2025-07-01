// user.service.js

import { userTable } from '../db/schema/user.schema.js';
import { eq, desc } from 'drizzle-orm';
import { db } from '../config/db.js';

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
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .execute();
    return user[0];
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
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.openid, openid))
      .execute();
    return user[0];
  } catch (error) {
    throw error;
  }
};

/**
 * 获取所有用户
 * @returns {Promise<Array>} - 用户列表
 */
export const getAllUsers = async () => {
  try {
    const users = await db
      .select()
      .from(userTable)
      .orderBy(desc(userTable.id))
      .execute();
    return users;
  } catch (error) {
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
