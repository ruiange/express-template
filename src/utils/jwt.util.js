import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRE_TIME = process.env.JWT_EXPIRES_IN || '1h';

/**
 * 生成 JWT 令牌
 * @param {Object} payload - 包含在令牌中的数据
 * @returns {string} 生成的 JWT 令牌
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRE_TIME });
};

/**
 * 验证 JWT 令牌
 * @param {string} token - 要验证的 JWT 令牌
 * @returns {Object} 令牌中的有效负载数据
 * @throws {Error} 如果令牌无效或已过期
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};
