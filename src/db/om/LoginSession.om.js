import { Schema, Repository } from 'redis-om';
import redisClient from '../../config/redisClient.js';

/**
 * 登录会话模式
 * @type {Schema<Record<string, any>>}
 * @property {string} scene - 会话ID
 * @property {string} status - 状态: waiting等待中/scanning扫码中/confirmed已登录/expired已过期
 * @property {string} openid - 微信用户openid
 * @property {Date} createdAt - 创建时间
 * @property {Date} expiresAt - 过期时间
 * @property {Date} confirmedAt - 确认时间
 */
const loginSessionSchema = new Schema(
  'LoginSession',
  {
    scene: { type: 'string' }, // 会话ID
    status: { type: 'string' }, // 状态: waiting/scanning/confirmed/expired
    openid: { type: 'string' }, // 微信用户openid
    createdAt: { type: 'date' }, // 创建时间
    expiresAt: { type: 'date' }, // 过期时间
    confirmedAt: { type: 'date' }, // 确认时间
  },
  {
    dataStructure: 'JSON', // 使用JSON结构存储
  }
);

// 创建Repository
const loginSessionRepository = new Repository(loginSessionSchema, redisClient);

// 确保索引已创建
await loginSessionRepository.createIndex();

export default loginSessionRepository;
