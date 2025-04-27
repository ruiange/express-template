import express from 'express';
import nineYinRouter from './modules/nineYinRouter.js';

const mainRouter = express.Router();

mainRouter.use('/9yin', nineYinRouter);
export default mainRouter;
