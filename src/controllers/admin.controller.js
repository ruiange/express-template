import { getAuditConfigByKey, updateAuditConfigByKey } from '../services/admin.service.js';
import { getAllUsers } from '../services/user.service.js';
import { db, sql } from '../config/db.js';
import { userTable } from '../db/schema/user.schema.js';
import chalk from 'chalk';


export const auditConfigController = async (req, res) => {
  let status = false;

  try {
    status = req.body.status;
  } catch (e) {
    console.log(e.message);
  }

  const result = await updateAuditConfigByKey(status);

  console.log(result);
  delete result.key
  return res.send({
    code: 2000,
    data:result,
    message: '更新成功',
  });
};


export const getAuditConfigController = async (req, res) => {
  const result = await getAuditConfigByKey();
  return res.send({
    code: 2000,
    data:result,
    message: '更新成功',
  });
};

/**
 * 获取用户列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getUserList = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    console.log(chalk.blue('获取用户列表请求参数:',  page, limit, search ));
    
    // 获取用户列表（支持分页和搜索）
    const result = await getAllUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      search: search.trim()
    });
    
    console.log(chalk.green('数据库查询结果:', {
      usersCount: result.users.length,
      pagination: result.pagination
    }));
    
    // 构建响应数据，隐藏敏感信息
    const userList = result.users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createTime: user.createTime,
      // 不返回密码和openid等敏感信息
    }));
    
    console.log(chalk.green('处理后的用户列表:', userList.length));
    
    res.status(200).json({
      code: 2000,
      message: '获取用户列表成功',
      data: {
        users: userList,
        pagination: result.pagination
      }
    });
  } catch (error) {
    console.log(chalk.red('获取用户列表错误:', error.message));
    console.log(chalk.red('错误堆栈:', error.stack));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message
    });
  }
};

/**
 * 测试数据库连接和查询
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const testDatabaseConnection = async (req, res) => {
  try {
    console.log(chalk.blue('测试数据库连接...'));
    
    // 直接查询所有用户
    const allUsers = await db.select().from(userTable).execute();
    console.log(chalk.green('直接查询结果:', allUsers.length));
    
    // 查询用户总数
    const countResult = await db.select({ count: sql`count(*)` }).from(userTable).execute();
    console.log(chalk.green('用户总数:', countResult[0].count));
    
    res.status(200).json({
      code: 2000,
      message: '数据库连接测试成功',
      data: {
        totalUsers: countResult[0].count,
        sampleUsers: allUsers.slice(0, 3) // 只返回前3个用户作为示例
      }
    });
  } catch (error) {
    console.log(chalk.red('数据库连接测试错误:', error.message));
    console.log(chalk.red('错误堆栈:', error.stack));
    res.status(500).json({
      code: 5000,
      message: '数据库连接测试失败',
      error: error.message
    });
  }
};