import { getAuditConfigByKey, updateAuditConfigByKey } from '../services/admin.service.js';
import { getAllUsers } from '../services/user.service.js';
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
    
    // 获取用户列表（支持分页和搜索）
    const result = await getAllUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      search: search.trim()
    });
    
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
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message
    });
  }
};