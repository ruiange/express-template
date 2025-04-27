import express from 'express';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import apiRouter from './api.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainRouter = express.Router();

mainRouter.use('/api', apiRouter);
mainRouter.use('/apidoc', express.static(path.join(__dirname, '../public/apidoc')));

mainRouter.use(express.static(path.join(__dirname, 'public')));

export default mainRouter;
