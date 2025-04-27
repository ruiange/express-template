import express from 'express';
import nineYinRouter from './modules/nineYinRouter.js';
import * as path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainRouter = express.Router();

mainRouter.use('/9yin', nineYinRouter);

mainRouter.use('/apidoc', express.static(path.join(__dirname, 'public/apidoc')));
mainRouter.use('/', (req, res) => {
  res.send('Hello World');
});
export default mainRouter;
