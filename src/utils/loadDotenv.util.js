import dotenv from 'dotenv';

let NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * 加载环境变量配置
 */
export const loadEnvConfig = () => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
    NODE_ENV = 'development';
  }
  if (process.env.NODE_ENV === 'production') {
    NODE_ENV = 'production';
  }
  console.log('当前环境：', NODE_ENV);
  return NODE_ENV;
};



export default loadEnvConfig;
