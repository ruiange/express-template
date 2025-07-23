// question.route.js

import express from 'express';
import QuestionController from '../../controllers/question.controller.js';

const questionRoute = express.Router();

questionRoute.get('/list',QuestionController.getQuestionList)

export default questionRoute;
