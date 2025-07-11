import express from 'express';
import { NamingController } from '../../controllers/ai.controller.js';

const aiRoute = express.Router();

/**
 * @api {post} /ai/name 起名宝
 * @apiName 起名宝
 * @apiGroup AI对话
 * @apiVersion 1.0.0
 */
aiRoute.post('/name', NamingController);

export default aiRoute;
