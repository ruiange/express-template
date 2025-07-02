import express from 'express';
import nineYinRoute from './modules/nineYin.route.js';
import douyinRoute from './modules/douyin.route.js';
import miniRoute from './modules/mini.route.js';
import wealthRoute from './modules/wealth.route.js';
import userRoute from './modules/user.route.js';
import uploadRouter from './modules/upload.route.js';

const apiRouter = express.Router();

apiRouter.use('/9yin', nineYinRoute);
apiRouter.use('/douyin', douyinRoute);
apiRouter.use('/mini', miniRoute);
apiRouter.use('/wealth', wealthRoute);
apiRouter.use('/user', userRoute);
apiRouter.use('/upload', uploadRouter);
export default apiRouter;
