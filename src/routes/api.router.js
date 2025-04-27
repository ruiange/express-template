import express from 'express';
import nineYinRouter from './modules/nineYin.router.js';

const apiRouter = express.Router();

apiRouter.use('/9yin', nineYinRouter);

export default apiRouter;
