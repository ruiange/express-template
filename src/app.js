import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import getEnvIp from './utils/ip.util.js';
import mainRouter from './routes/main.router.js';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { requestLogMiddleware } from './middlewares/requestLog.middleware.js';

/** @type {Express} */
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 配置EJS模板引擎 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

/**
 * 配置静态文件中间件
 */
app.use(express.static(path.join(__dirname, './public')));

/* 启用CORS中间件，允许跨域请求 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*' /* 允许的跨域来源 */,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] /* 允许的HTTP方法 */,
  })
);
app.use(requestLogMiddleware);
/* 解析JSON格式的请求体 */
app.use(express.json());
/* 注册主路由 */
app.use(mainRouter);

/* 设置服务器端口，优先使用环境变量中的PORT，默认为3000 */
const port = process.env.PORT || 3000;

/* 启动服务器并监听指定端口 */
app.listen(port, () => {
  console.log(`服务运行在:http://${getEnvIp()}:${port}`);
  console.log(`服务运行在:http://${getEnvIp()}:${port}/apidoc`);
});
