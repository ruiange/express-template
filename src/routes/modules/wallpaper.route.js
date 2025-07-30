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
  getDailyWallpaperController,
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
 * @api {post} /wallpaper 创建壁纸
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
 * @api {get} /wallpaper/list 获取壁纸列表
 * @apiName GetWallpapers
 * @apiGroup 壁纸
 * @apiDescription 获取壁纸列表，支持分页、搜索、分类筛选
 *
 * @apiParam {Number} current 当前页码，默认为1
 * @apiParam {Number} pageSize 每页数量，默认为10
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
 * @api {get} /wallpaper/popular 获取热门壁纸
 * @apiName GetPopularWallpapers
 * @apiGroup 壁纸
 * @apiDescription 获取热门壁纸列表
 *
 * @apiParam {Number} pageSize 返回数量，默认为10
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Array} data 热门壁纸列表
 */
wallpaperRoute.get('/popular', getPopularWallpapersController);

/**
 * @api {get} /wallpaper/latest 获取最新壁纸
 * @apiName GetLatestWallpapers
 * @apiGroup 壁纸
 * @apiDescription 获取最新壁纸列表
 *
 * @apiParam {Number} pageSize 返回数量，默认为10
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Array} data 最新壁纸列表
 */
wallpaperRoute.get('/latest', getLatestWallpapersController);

/**
 * @api {get} /wallpaper/daily 获取每日壁纸
 * @apiName GetDailyWallpaper
 * @apiGroup 壁纸
 * @apiDescription 获取每日壁纸，每天返回固定的一张壁纸
 *
 * @apiParam {String} [date] 日期 (YYYY-MM-DD格式)，可选，默认为今天
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Object} data 每日壁纸数据
 * @apiSuccess {Number} data.id 壁纸ID
 * @apiSuccess {String} data.title 壁纸标题
 * @apiSuccess {String} data.description 壁纸描述
 * @apiSuccess {String} data.filePath 文件路径
 * @apiSuccess {String} data.thumbnailPath 缩略图路径
 * @apiSuccess {Number} data.fileSize 文件大小
 * @apiSuccess {Number} data.width 图片宽度
 * @apiSuccess {Number} data.height 图片高度
 * @apiSuccess {String} data.fileType 文件类型
 * @apiSuccess {Number} data.categoryId 分类ID
 * @apiSuccess {Boolean} data.isPublic 是否公开
 * @apiSuccess {Number} data.viewCount 浏览次数
 * @apiSuccess {Number} data.downloadCount 下载次数
 * @apiSuccess {String} data.uploadDate 上传日期
 * @apiSuccess {String} data.date 对应的日期
 *
 * @apiError {Number} code 错误码
 * @apiError {String} message 错误信息
 * @apiErrorExample {json} 日期格式错误:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 4000,
 *       "message": "日期格式错误，请使用YYYY-MM-DD格式"
 *     }
 * @apiErrorExample {json} 暂无壁纸:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 4004,
 *       "message": "暂无可用的每日壁纸"
 *     }
 */
wallpaperRoute.get('/daily', getDailyWallpaperController);

/**
 * @api {get} /wallpaper/:id 获取壁纸详情
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
 * @api {put} /wallpaper/:id 更新壁纸
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
 * @api {delete} /wallpaper/:id 删除壁纸
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

/**
 * @api {post} /wallpaper/batch-delete 批量删除壁纸
 * @apiName BatchDeleteWallpapers
 * @apiGroup 壁纸
 * @apiDescription 批量删除多个壁纸
 *
 * @apiParam {Array} ids 壁纸ID数组
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 成功消息
 *
 * @apiError {Number} code 错误码
 * @apiError {String} message 错误信息
 * @apiErrorExample {json} 参数错误:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 4000,
 *       "message": "无效的壁纸ID列表"
 *     }
 */
wallpaperRoute.post('/batch-delete', authMiddleware, deleteWallpapersController);

/**
 * @api {post} /wallpaper/:id/download 下载壁纸
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
 * @api {post} /wallpaper/category 创建分类
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
 * @api {get} /wallpaper/category/list 获取所有分类
 * @apiName GetCategories
 * @apiGroup 壁纸分类
 * @apiDescription 获取所有壁纸分类
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Array} data 分类列表
 */
wallpaperRoute.get('/category/list', getCategoriesController);

/**
 * @api {get} /wallpaper/category/:id 获取分类详情
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
 * @api {put} /wallpaper/category/:id 更新分类
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
 * @api {delete} /wallpaper/category/:id 删除分类
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
