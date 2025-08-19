// user.service.js

import User from '../models/user.model.js';
import chalk from 'chalk';

/**
 * 用户注册服务
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<Object>} - 注册的用户对象
 */
export const registerUser = async (username, password) => {
  // 检查用户是否已存在
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('用户名或邮箱已被使用');
  }

  // 创建新用户
  const user = new User({
    username,
    password, // 注意：实际应用中需要对密码进行加密
  });
  await user.save();
  return user;
};

/**
 * 创建用户
 * @param {Object} userData - 用户数据
 * @returns {Promise<Object>} - 创建的用户对象
 */
export const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

/**
 * 根据ID获取用户
 * @param id
 * @returns
 * @doc sss
 */
export const getUserById = async (id) => {
  try {
    const userData = await User.findById(id);
    if (!userData) {
      console.log('❌ 查询失败，未找到用户。可能原因：ID 不正确，或者数据已被删除');
    } else {
      console.log('✅ 查询成功！用户数据:', userData);
    }
    return userData;
  } catch (error) {
    console.log(chalk.red(error.message));
    throw error;
  }
};

/**
 * 根据openid获取用户
 * @param openid
 * @param projection
 * @returns
 * @doc
 */
export const getUserByOpenid = async (openid, projection = { __v: 0 }) => {
  try {
    return await User.findOne({ openid }, projection);
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
    const skip = (page - 1) * limit;

    console.log(chalk.yellow('getAllUsers 参数:', { page, limit, search, role, membership, skip }));

    // 构建查询条件
    const query = {};

    // 如果有搜索关键词，添加搜索条件
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { nickname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // 添加角色筛选条件
    if (role) {
      query.role = role;
    }

    // 添加会员等级筛选条件
    if (membership !== undefined && membership !== '') {
      query.membership = parseInt(membership);
    }

    console.log(chalk.yellow('执行计数查询...'));
    const total = await User.countDocuments(query);
    console.log(chalk.yellow('总记录数:', total));

    // 获取分页数据
    console.log(chalk.yellow('执行分页查询...'));
    const users = await User.find(query)
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skip)
      .select('-password');

    console.log(chalk.yellow('查询到的用户数量:', users.length));
    if (users.length > 0) {
      console.log(
        chalk.yellow('第一个用户示例:', {
          id: users[0]._id,
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
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.log(chalk.red('getAllUsers 错误:', error.message));
    console.log(chalk.red('错误堆栈:', error.stack));
    throw error;
  }
};

/**
 * 获取用户总数
 */
export const getUserCount = async () => {
  const count = await User.countDocuments();
  return [{ count }];
};

/**
 * 获取时间段用户数
 */
export const getUserCountByTime = async (startTime, endTime) => {
  const count = await User.countDocuments({
    createdAt: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    },
  });
  return [{ count }];
};

/**
 * 更新用户信息
 * @param {string} id - 用户ID
 * @param {Object} userData - 需要更新的用户数据
 * @returns {Promise<Object>} - 更新后的用户对象
 */
export const updateUser = async (id, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

/**
 * 删除用户
 * @param {string} id - 用户ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (id) => {
  try {
    const result = await User.findByIdAndDelete(id);
    console.log(result, '删除用户成功');
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * 根据id批量删除用户
 */
export const deleteUserByIds = async (ids) => {
  try {
    const result = await User.deleteMany({ _id: { $in: ids } });
    return result.deletedCount;
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
