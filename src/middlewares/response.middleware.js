/**
 * @file response.middleware.js
 * @description 统一API响应格式中间件
 * 为res对象添加success、error、notFound等方法，确保所有API返回统一的数据结构
 */

/**
 * 响应封装中间件
 * 扩展res对象，添加自定义方法用于返回统一格式的响应
 * 
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
const responseMiddleware = (req, res, next) => {
  // 成功响应 - 状态码 200
  res.success = (data = null, message = '操作成功') => {
    return res.status(200).json({
      code: 2000,
      success: true,
      message,
      data
    });
  };

  // 创建成功响应 - 状态码 201
  res.created = (data = null, message = '创建成功') => {
    return res.status(201).json({
      code: 201,
      success: true,
      message,
      data
    });
  };

  // 错误响应 - 默认状态码 400
  res.error = (message = '操作失败', code = 400, errors = null) => {
    return res.status(code).json({
      code,
      success: false,
      message,
      errors
    });
  };

  // 未找到响应 - 状态码 404
  res.notFound = (message = '资源不存在') => {
    return res.status(404).json({
      code: 404,
      success: false,
      message
    });
  };

  // 未授权响应 - 状态码 401
  res.unauthorized = (message = '未授权访问') => {
    return res.status(401).json({
      code: 401,
      success: false,
      message
    });
  };

  // 禁止访问响应 - 状态码 403
  res.forbidden = (message = '禁止访问') => {
    return res.status(403).json({
      code: 403,
      success: false,
      message
    });
  };

  // 服务器错误响应 - 状态码 500
  res.serverError = (message = '服务器内部错误') => {
    return res.status(500).json({
      code: 500,
      success: false,
      message
    });
  };

  next();
};

export default responseMiddleware; 