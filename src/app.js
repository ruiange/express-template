import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import getEnvIp from './utils/ip.util.js';
import mainRouter from './routes/main.router.js';

/** @type {Express} */
const app = express();



// 配置EJS模板引擎
app.set('view engine', 'ejs');
app.set('views', './src/views/pages');

// 启用CORS中间件，允许跨域请求
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*', // 允许的跨域来源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的HTTP方法
  })
);
// 解析JSON格式的请求体
app.use(express.json());
// 注册主路由
app.use(mainRouter)

// 设置服务器端口，优先使用环境变量中的PORT，默认为3000
const port = process.env.PORT || 3000;

// 启动服务器并监听指定端口
app.listen(port, () => {
  console.log(`服务运行在:http://${getEnvIp()}:${port}`);
  console.log(`服务运行在:http://${getEnvIp()}:${port}/apidoc`);
})