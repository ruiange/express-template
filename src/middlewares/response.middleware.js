const responseMiddleware = (req, res, next) => {
  // 成功响应 - 状态码 200
  res.success = (data = null, message = '操作成功', code = 2000) => {
    return res.status(200).json({
      code,
      message,
      data,
    });
  };

  // 创建成功响应 - 状态码 201
  res.created = (data = null, message = '创建成功', code = 2001) => {
    return res.status(201).json({
      code: code,
      message,
      data,
    });
  };

  // 错误响应 - 默认状态码 400
  res.error = (message = '操作失败', code = 400, errors = null) => {
    return res.status(code).json({
      code,
      message,
      errors,
    });
  };

  // 未找到响应 - 状态码 404
  res.notFound = (message = '资源不存在') => {
    return res.status(404).json({
      code: 404,
      message,
    });
  };

  // 未授权响应 - 状态码 401
  res.unauthorized = (message = '未授权访问') => {
    return res.status(401).json({
      code: 4001,
      message,
    });
  };

  // 禁止访问响应 - 状态码 403
  res.forbidden = (message = '禁止访问') => {
    return res.status(403).json({
      code: 403,

      message,
    });
  };

  // 服务器错误响应 - 状态码 500
  res.serverError = (message = '服务器内部错误') => {
    return res.status(500).json({
      code: 500,

      message,
    });
  };

  next();
};

export default responseMiddleware;
