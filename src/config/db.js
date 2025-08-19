import mongoose from 'mongoose';
import getEevIp from '../utils/getEevIp.util.js';
import chalk from 'chalk';

/**
 * 连接数据库
 * @returns {Promise<void>}
 */
const connectDatabase = async () => {
  console.log(chalk.bgGreen.black.bold(`数据库连接中${process.env.MONGODB_URI}`));
  console.log(`====================${getEevIp()}===============================`);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
    });
    console.log(chalk.bgGreen.black.bold(`数据库连接成功${process.env.MONGODB_URI}`));
  } catch (e) {
    console.log(chalk.bgRed.black.bold(`数据库连接失败 ${e.message}`));
  }
};
export default connectDatabase;