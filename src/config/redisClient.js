import { createClient } from 'redis';
import chalk from 'chalk';
import dayjs from 'dayjs';
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});


redisClient.on('error', (err) => console.error('Redis Client Error', err));
console.log(chalk.blue('开始连接Redis数据库...'))
//计算链接耗时
const start = dayjs();
await redisClient.connect();
console.log(chalk.green(`Redis数据库连接成功,耗时:${dayjs().diff(start, 'milliseconds')}ms`))

export default redisClient;