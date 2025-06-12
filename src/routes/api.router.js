import express from 'express';
import nineYinRouter from './modules/nineYin.router.js';
import douyinRouter from './modules/douyin.router.js';

const apiRouter = express.Router();

apiRouter.use('/9yin', nineYinRouter);
apiRouter.use('/douyin', douyinRouter);
export default apiRouter;
