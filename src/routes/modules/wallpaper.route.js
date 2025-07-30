import express from 'express';
import {
  createWallpaperController,
  getWallpaperController,
  getWallpapersController,
  updateWallpaperController,
  deleteWallpaperController,
  downloadWallpaperController,
  getPopularWallpapersController,
  getLatestWallpapersController,
  createCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController, deleteWallpapersController,
} from '../../controllers/wallpaper.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const wallpaperRoute = express.Router();

// ==================== 壁纸相关路由 ====================

/**
 * @api {post} /api/wallpaper 创建壁纸
 * @apiName CreateWallpaper
 * @apiGroup 壁纸
 * @apiDescription 创建新的壁纸
 *
 * @apiParam {String} title 壁纸标题
 * @apiParam {String} description 壁纸描述
 * @apiParam {String} filePath 文件存储路径
 * @apiParam {String} thumbnailPath 缩略图路径
 * @apiParam {Number} fileSize 文件大小(字节)
 * @apiParam {Number} width 图片宽度(像素)
 * @apiParam {Number} height 图片高度(像素)
 * @apiParam {String} fileType 文件类型(jpg, png等)
 * @apiParam {Number} categoryId 分类ID
 * @apiParam {Boolean} isPublic 是否公开
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 成功消息
 * @apiSuccess {Object} data 创建的壁纸数据
 */
wallpaperRoute.post('/', authMiddleware, createWallpaperController);

/**
 * @api {get} /api/wallpaper/list 获取壁纸列表
 * @apiName GetWallpapers
 * @apiGroup 壁纸
 * @apiDescription 获取壁纸列表，支持分页、搜索、分类筛选
 *
 * @apiParam {Number} page 页码，默认为1
 * @apiParam {Number} limit 每页数量，默认为10
 * @apiParam {String} search 搜索关键词
 * @apiParam {Number} categoryId 分类ID
 * @apiParam {Boolean} isPublic 是否公开，默认为true
 * @apiParam {String} sortBy 排序字段(uploadDate, viewCount, downloadCount)
 * @apiParam {String} sortOrder 排序方向(asc, desc)
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Object} data 壁纸列表和分页信息
 */
wallpaperRoute.get('/list', getWallpapersController);

/**
 * @api {get} /api/wallpaper/popular 获取热门壁纸
 * @apiName GetPopularWallpapers
 * @apiGroup 壁纸
 * @apiDescription 获取热门壁纸列表
 *
 * @apiParam {Number} limit 返回数量，默认为10
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Array} data 热门壁纸列表
 */
wallpaperRoute.get('/popular', getPopularWallpapersController);

/**
 * @api {get} /api/wallpaper/latest 获取最新壁纸
 * @apiName GetLatestWallpapers
 * @apiGroup 壁纸
 * @apiDescription 获取最新壁纸列表
 *
 * @apiParam {Number} limit 返回数量，默认为10
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Array} data 最新壁纸列表
 */
wallpaperRoute.get('/latest', getLatestWallpapersController);

/**
 * @api {get} /api/wallpaper/:id 获取壁纸详情
 * @apiName GetWallpaper
 * @apiGroup 壁纸
 * @apiDescription 根据ID获取壁纸详情
 *
 * @apiParam {Number} id 壁纸ID
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Object} data 壁纸数据
 */
wallpaperRoute.get('/:id', getWallpaperController);

/**
 * @api {put} /api/wallpaper/:id 更新壁纸
 * @apiName UpdateWallpaper
 * @apiGroup 壁纸
 * @apiDescription 更新壁纸信息
 *
 * @apiParam {Number} id 壁纸ID
 * @apiParam {String} title 壁纸标题
 * @apiParam {String} description 壁纸描述
 * @apiParam {String} filePath 文件存储路径
 * @apiParam {String} thumbnailPath 缩略图路径
 * @apiParam {Number} fileSize 文件大小(字节)
 * @apiParam {Number} width 图片宽度(像素)
 * @apiParam {Number} height 图片高度(像素)
 * @apiParam {String} fileType 文件类型
 * @apiParam {Number} categoryId 分类ID
 * @apiParam {Boolean} isPublic 是否公开
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 成功消息
 * @apiSuccess {Object} data 更新后的壁纸数据
 */
wallpaperRoute.put('/:id', authMiddleware, updateWallpaperController);

/**
 * @api {delete} /api/wallpaper/:id 删除壁纸
 * @apiName DeleteWallpaper
 * @apiGroup 壁纸
 * @apiDescription 删除壁纸
 *
 * @apiParam {Number} id 壁纸ID
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 成功消息
 */
wallpaperRoute.delete('/:id', authMiddleware, deleteWallpaperController);

//批量删除
wallpaperRoute.post('/batch-delete', authMiddleware, deleteWallpapersController);

/**
 * @api {post} /api/wallpaper/:id/download 下载壁纸
 * @apiName DownloadWallpaper
 * @apiGroup 壁纸
 * @apiDescription 下载壁纸并增加下载次数
 *
 * @apiParam {Number} id 壁纸ID
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 成功消息
 * @apiSuccess {Object} data 下载链接
 */
wallpaperRoute.post('/:id/download', downloadWallpaperController);

// ==================== 分类相关路由 ====================

/**
 * @api {post} /api/wallpaper/category 创建分类
 * @apiName CreateCategory
 * @apiGroup 壁纸分类
 * @apiDescription 创建新的壁纸分类
 *
 * @apiParam {String} name 分类名称
 * @apiParam {String} description 分类描述
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 成功消息
 * @apiSuccess {Object} data 创建的分类数据
 */
wallpaperRoute.post('/category', authMiddleware, createCategoryController);

/**
 * @api {get} /api/wallpaper/category/list 获取所有分类
 * @apiName GetCategories
 * @apiGroup 壁纸分类
 * @apiDescription 获取所有壁纸分类
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Array} data 分类列表
 */
wallpaperRoute.get('/category/list', getCategoriesController);

/**
 * @api {get} /api/wallpaper/category/:id 获取分类详情
 * @apiName GetCategory
 * @apiGroup 壁纸分类
 * @apiDescription 根据ID获取分类详情
 *
 * @apiParam {Number} id 分类ID
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Object} data 分类数据
 */
wallpaperRoute.get('/category/:id', getCategoryController);

/**
 * @api {put} /api/wallpaper/category/:id 更新分类
 * @apiName UpdateCategory
 * @apiGroup 壁纸分类
 * @apiDescription 更新分类信息
 *
 * @apiParam {Number} id 分类ID
 * @apiParam {String} name 分类名称
 * @apiParam {String} description 分类描述
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 成功消息
 * @apiSuccess {Object} data 更新后的分类数据
 */
wallpaperRoute.put('/category/:id', authMiddleware, updateCategoryController);

/**
 * @api {delete} /api/wallpaper/category/:id 删除分类
 * @apiName DeleteCategory
 * @apiGroup 壁纸分类
 * @apiDescription 删除分类（只有当分类下没有壁纸时才能删除）
 *
 * @apiParam {Number} id 分类ID
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 成功消息
 *
 * @apiError {String} message 错误信息（当分类下还有壁纸时）
 */
wallpaperRoute.delete('/category/:id', authMiddleware, deleteCategoryController);

export default wallpaperRoute;
