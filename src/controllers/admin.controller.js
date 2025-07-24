import { getAuditConfigByKey, updateAuditConfigByKey } from '../services/admin.service.js';
import { deleteUserByIds, getAllUsers } from '../services/user.service.js';
import { db, sql } from '../config/db.js';
import { userTable } from '../db/schemas/user.schema.js';
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
  delete result.key;
  return res.send({
    code: 2000,
    data: result,
    message: '更新成功',
  });
};

export const getAuditConfigController = async (req, res) => {
  const result = await getAuditConfigByKey();
  return res.send({
    code: 2000,
    data: result,
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
    const { current = 1, pageSize = 10, search = '', role, membership } = req.query;

    console.log(chalk.blue('获取用户列表请求参数:', current, pageSize, search, role, membership));

    // 获取用户列表（支持分页、搜索和筛选）
    const result = await getAllUsers({
      page: parseInt(current),
      limit: parseInt(pageSize),
      search: search.trim(),
      role: role,
      membership: membership,
    });

    console.log(
      chalk.green('数据库查询结果:', {
        usersCount: result.users.length,
        pagination: result.pagination,
      })
    );

    // 构建响应数据，隐藏敏感信息
    const userList = result.users.map((user) => {
      let userObj = { ...user };
      delete userObj.password;
      return userObj;
    });

    console.log(chalk.green('处理后的用户列表:', userList.length));

    res.status(200).json({
      code: 2000,
      message: '获取用户列表成功',
      data: {
        list: userList,
        pagination: result.pagination,
      },
    });
  } catch (error) {
    console.log(chalk.red('获取用户列表错误:', error.message));
    console.log(chalk.red('错误堆栈:', error.stack));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

export const deleteUsers = async (req, res) => {
  const ids = req.body.ids || [];
  if (!ids.length) {
    return res.error({
      code: 4000,
      message: '请选择要删除的用户',
    });
  }
  const rowCount = await deleteUserByIds(ids);
  if (rowCount <= 0) {
    return res.error({
      code: 4000,
      message: '删除失败',
    });
  }
  res.success({
    code: 2000,
    message: '删除成功',
    data: rowCount,
  });
};
