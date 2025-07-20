// images.route.js

import express from 'express';
import { addImage } from '../../controllers/images.controller.js';

const imagesRoute = express.Router();

imagesRoute.post('/', addImage);

export default imagesRoute;
