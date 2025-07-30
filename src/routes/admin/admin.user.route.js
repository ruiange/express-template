import express from 'express';
import { deleteUsers, getUserList } from '../../controllers/admin.controller.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { confirmQrcodeLogin } from '../../controllers/user.controller.js';

const adminUserRoute = express.Router();


adminUserRoute.get('/users', authMiddleware, adminMiddleware, getUserList);


adminUserRoute.delete('/delete', authMiddleware, adminMiddleware, deleteUsers);


adminUserRoute.post('/login-qrcode/confirm', authMiddleware, adminMiddleware, confirmQrcodeLogin);


export default adminUserRoute;
