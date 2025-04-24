import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import getEnvIp from './utils/ipUtil.js';

const app = express();
app.use(cors());


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务运行在:http://${getEnvIp()}:${port}`);
})