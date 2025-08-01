import express from 'express';
import adminAuditRoute from './admin.audit.route.js';
import adminUserRoute from './admin.user.route.js';

const adminRoute = express.Router();

adminRoute.use('/audit', adminAuditRoute);
adminRoute.use('/users', adminUserRoute);

export default adminRoute;
