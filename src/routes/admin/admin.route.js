import express from 'express';
import adminAuditRoute from './admin.audit.route.js';

const adminRoute = express.Router();


adminRoute.use('/audit',adminAuditRoute)


export default adminRoute