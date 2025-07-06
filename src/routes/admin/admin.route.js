import express from 'express';
import auditRoute from './audit.route.js';

const adminRoute = express.Router();


adminRoute.use('/audit',auditRoute)

export default adminRoute