import { Schema, Repository } from 'redis-om';
import redisClient from '../../config/redisClient.js';

// 定义登录会话Schema
const loginSessionSchema = new Schema(
  'LoginSession',
  {
    scene: { type: 'string' }, // 会话ID
    status: { type: 'string' }, // 状态: waiting/confirmed/expired
    openid: { type: 'string' }, // 微信用户openid
    socketId: { type: 'string' }, // 关联的WebSocket ID
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
