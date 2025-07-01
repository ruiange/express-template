/**
 * 管理员验证中间件
 * 用于验证当前请求用户是否具有管理员权限
 * 该中间件需要在认证中间件之后使用
 */
export const adminMiddleware = async (req, res, next) => {
  try {
    // 确保用户已经通过了身份验证
    if (!req.user) {
      return res.status(401).json({ code: 4001, message: '未经身份验证的用户' });
    }

    // 检查用户角色
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        code: 4003, 
        message: '权限不足，需要管理员权限' 
      });
    }

    // 如果是管理员，则继续处理请求
    next();
  } catch (error) {
    return res.status(500).json({ 
      code: 5000, 
      message: `服务器内部错误: ${error.message}` 
    });
  }
}; 