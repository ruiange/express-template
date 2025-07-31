// dashboard.route.js

import express from 'express';
import DashboardController from '../../controllers/dashboard.controller.js';

const dashboardRoute = express.Router();

dashboardRoute.get('/',DashboardController.getStatic)

export default dashboardRoute;
