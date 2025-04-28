import {db} from '../config/db.js';

// 定义日志模型
export const Log = db.define('log', {
  method: String,
  url: String,
  statusCode: Number,
  timestamp: Date
});
