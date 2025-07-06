import express from 'express';
import { getUserList } from '../../controllers/admin.controller.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const adminUserRoute = express.Router();


adminUserRoute.get('/users', authMiddleware, adminMiddleware, getUserList);

export default adminUserRoute;
