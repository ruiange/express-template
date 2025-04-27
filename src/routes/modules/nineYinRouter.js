import express from 'express';
import { scanNews } from '../../controllers/nineYinControllers.js';
const nineYinRouter = express.Router();

nineYinRouter.get('/scan/news' ,scanNews)

export default nineYinRouter;