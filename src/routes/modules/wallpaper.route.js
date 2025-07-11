import express from 'express';

import { getWallpaper } from '../../controllers/wallpaper.controller.js';

const wallpaperRoute = express.Router();

/**
 * @api {get} /wallpaper 获取壁纸
 * @apiName getWallpaper
 * @apiGroup 壁纸
 * @apiDescription 获取壁纸
 * @apiVersion 1.0.0
 */
wallpaperRoute.get('/', getWallpaper);

export default wallpaperRoute;
