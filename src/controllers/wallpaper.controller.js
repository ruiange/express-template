// wallpaper.controller.js

import chalk from 'chalk';
import {
  createWallpaper,
  getWallpaperById,
  getAllWallpapers,
  updateWallpaper,
  deleteWallpaper,
  incrementDownloadCount,
  getPopularWallpapers,
  getLatestWallpapers,
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  batchDeleteWallpaper,
  getWallpapersByIds,
  getDailyWallpaper,
} from '../services/wallpaper.service.js';
import { batchUpdateFileStatus, markFileStatus } from '../services/fileResources.service.js';

/**
 * 创建壁纸
 * @param {Object} req - 请求对象
 * @param {Object} req.body - 请求体
 * @param {string} [req.body.title] - 壁纸标题 (最大255字符)
 * @param {string} [req.body.description] - 壁纸描述
 * @param {string} req.body.filePath - 文件存储路径 (必填，最大512字符)
 * @param {string} [req.body.thumbnailPath] - 缩略图路径 (最大512字符)
 * @param {string} [req.body.fileKey] - 存储文件的key (最大512字符)
 * @param {number|string} [req.body.fileSize] - 文件大小(字节)
 * @param {number|string} [req.body.width] - 图片宽度(像素)
 * @param {number|string} [req.body.height] - 图片高度(像素)
 * @param {string} [req.body.fileType] - 文件类型(jpg, png等，最大50字符)
 * @param {number|string} [req.body.categoryId] - 分类ID(外键)
 * @param {boolean|string} [req.body.isPublic=true] - 是否公开
 * @param {Object} res - 响应对象
 */
export const createWallpaperController = async (req, res) => {
  try {
    const {
      title,
      description,
      filePath,
      thumbnailPath,
      fileKey,
      fileSize,
      width,
      height,
      fileType,
      categoryId,
      isPublic = true,
    } = req.body;

    // 验证必填字段
    if (!filePath) {
      return res.status(400).json({
        code: 4000,
        message: '请先上传文件',
      });
    }

    // 构建壁纸数据对象，严格按照schema定义
    const wallpaperData = {
      title: title || null,
      description: description || null,
      filePath, // 必填字段
      thumbnailPath: thumbnailPath || null,
      fileKey: fileKey || null,
      fileSize: fileSize ? parseInt(fileSize) : null,
      width: width ? parseInt(width) : null,
      height: height ? parseInt(height) : null,
      fileType: fileType || null,
      categoryId: categoryId ? parseInt(categoryId) : null,
      isPublic: isPublic !== undefined ? Boolean(isPublic) : true, // 默认为true，符合schema定义
    };

    const newWallpaper = await createWallpaper(wallpaperData);
    await markFileStatus(filePath, 'active')
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });

    res.created(newWallpaper, '壁纸创建成功');
  } catch (error) {
    console.log(chalk.red('创建壁纸控制器错误:', error.message));

    // 处理数据库约束错误
    if (error.message.includes('foreign key constraint')) {
      return res.status(400).json({
        code: 4000,
        message: '指定的分类不存在',
      });
    }

    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 获取壁纸详情
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getWallpaperController = async (req, res) => {
  try {
    const { id } = req.params;
    const wallpaperId = parseInt(id);

    if (isNaN(wallpaperId)) {
      return res.status(400).json({
        code: 4000,
        message: '无效的壁纸ID',
      });
    }

    const wallpaper = await getWallpaperById(wallpaperId);

    if (!wallpaper) {
      return res.status(404).json({
        code: 4004,
        message: '壁纸不存在',
      });
    }

    res.json({
      code: 2000,
      data: wallpaper,
    });
  } catch (error) {
    console.log(chalk.red('获取壁纸控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 获取壁纸列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getWallpapersController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      categoryId,
      isPublic = 'true',
      sortBy = 'uploadDate',
      sortOrder = 'desc',
    } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      isPublic: isPublic === 'true',
      sortBy,
      sortOrder,
    };

    const result = await getAllWallpapers(options);

    res.json({
      code: 2000,
      data: result,
    });
  } catch (error) {
    console.log(chalk.red('获取壁纸列表控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 更新壁纸
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const updateWallpaperController = async (req, res) => {
  try {
    const { id } = req.params;
    const wallpaperId = parseInt(id);

    if (isNaN(wallpaperId)) {
      return res.status(400).json({
        code: 4000,
        message: '无效的壁纸ID',
      });
    }

    const updateData = req.body;

    // 转换数字字段
    if (updateData.fileSize) updateData.fileSize = parseInt(updateData.fileSize);
    if (updateData.width) updateData.width = parseInt(updateData.width);
    if (updateData.height) updateData.height = parseInt(updateData.height);
    if (updateData.categoryId) updateData.categoryId = parseInt(updateData.categoryId);
    if (updateData.isPublic !== undefined) updateData.isPublic = Boolean(updateData.isPublic);

    const updatedWallpaper = await updateWallpaper(wallpaperId, updateData);

    if (!updatedWallpaper) {
      return res.status(404).json({
        code: 4004,
        message: '壁纸不存在',
      });
    }

    res.json({
      code: 2000,
      message: '壁纸更新成功',
      data: updatedWallpaper,
    });
  } catch (error) {
    console.log(chalk.red('更新壁纸控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 删除壁纸
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const deleteWallpaperController = async (req, res) => {
  try {
    const { id } = req.params;
    const wallpaperId = parseInt(id);

    if (isNaN(wallpaperId)) {
      return res.status(400).json({
        code: 4000,
        message: '无效的壁纸ID',
      });
    }
    const info = await getWallpaperById(wallpaperId);
    console.log(info.fileKey);
    markFileStatus(info.filePath, 'unused')
      .then((r) => {
        console.log('标记未使用');
      })
      .catch((e) => {
        console.log(e);
      });
    await deleteWallpaper(wallpaperId);

    res.success(null, '壁纸删除成功');
  } catch (error) {
    console.log(chalk.red('删除壁纸控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 批量删除
 */
export const deleteWallpapersController = async (req, res) => {
  const ids = req.body.ids;
  try {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        code: 4000,
        message: '无效的壁纸ID列表',
      });
    }
    const list = await getWallpapersByIds(ids);
    console.log(list);

    const pathList = list.map((item) => item.filePath);

    batchUpdateFileStatus(pathList, 'unused')
      .then((r) => {
        console.log(r);
        console.log(chalk.yellow(`[批量更新文件状态未=为未使用] ${ids.join(', ')}`));
      })
      .catch((e) => {
        console.error('[批量更新文件状态未=为未使用失败]', e.message);
      });
    await batchDeleteWallpaper(ids);

    res.success(null, '批量删除成功');
  } catch (error) {
    console.log(chalk.red('批量删除壁纸控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};
/**
 * 下载壁纸（增加下载次数）
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const downloadWallpaperController = async (req, res) => {
  try {
    const { id } = req.params;
    const wallpaperId = parseInt(id);

    if (isNaN(wallpaperId)) {
      return res.status(400).json({
        code: 4000,
        message: '无效的壁纸ID',
      });
    }

    const wallpaper = await getWallpaperById(wallpaperId);

    if (!wallpaper) {
      return res.status(404).json({
        code: 4004,
        message: '壁纸不存在',
      });
    }

    // 增加下载次数
    await incrementDownloadCount(wallpaperId);

    res.json({
      code: 2000,
      message: '下载成功',
      data: {
        downloadUrl: wallpaper.filePath,
        thumbnailUrl: wallpaper.thumbnailPath,
      },
    });
  } catch (error) {
    console.log(chalk.red('下载壁纸控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 获取热门壁纸
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getPopularWallpapersController = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit);

    const popularWallpapers = await getPopularWallpapers(limitNum);

    res.json({
      code: 2000,
      data: popularWallpapers,
    });
  } catch (error) {
    console.log(chalk.red('获取热门壁纸控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 获取最新壁纸
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getLatestWallpapersController = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit);

    const latestWallpapers = await getLatestWallpapers(limitNum);

    res.json({
      code: 2000,
      data: latestWallpapers,
    });
  } catch (error) {
    console.log(chalk.red('获取最新壁纸控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 获取每日壁纸
 * @param {Object} req - 请求对象
 * @param {Object} req.query - 查询参数
 * @param {string} [req.query.date] - 日期 (YYYY-MM-DD格式)，可选，默认为今天
 * @param {Object} res - 响应对象
 */
export const getDailyWallpaperController = async (req, res) => {
  try {
    const { date } = req.query;
    
    // 验证日期格式（如果提供了日期）
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        code: 4000,
        message: '日期格式错误，请使用YYYY-MM-DD格式',
      });
    }

    const dailyWallpaper = await getDailyWallpaper(date);

    if (!dailyWallpaper) {
      return res.status(404).json({
        code: 4004,
        message: '暂无可用的每日壁纸',
      });
    }

    res.json({
      code: 2000,
      data: {
        ...dailyWallpaper,
        date: date || new Date().toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.log(chalk.red('获取每日壁纸控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

// ==================== 分类相关控制器 ====================

/**
 * 创建分类
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        code: 4000,
        message: '分类名称不能为空',
      });
    }

    const categoryData = {
      name,
      description: description || null,
    };

    const newCategory = await createCategory(categoryData);

    res.created(newCategory, '分类创建成功');
  } catch (error) {
    console.log(chalk.red('创建分类控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 获取所有分类
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.json({
      code: 2000,
      data: categories,
    });
  } catch (error) {
    console.log(chalk.red('获取分类列表控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 获取分类详情
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return res.status(400).json({
        code: 4000,
        message: '无效的分类ID',
      });
    }

    const category = await getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({
        code: 4004,
        message: '分类不存在',
      });
    }

    res.json({
      code: 2000,
      data: category,
    });
  } catch (error) {
    console.log(chalk.red('获取分类控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 更新分类
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return res.status(400).json({
        code: 4000,
        message: '无效的分类ID',
      });
    }

    const updateData = req.body;
    const updatedCategory = await updateCategory(categoryId, updateData);

    if (!updatedCategory) {
      return res.status(404).json({
        code: 4004,
        message: '分类不存在',
      });
    }

    res.json({
      code: 2000,
      message: '分类更新成功',
      data: updatedCategory,
    });
  } catch (error) {
    console.log(chalk.red('更新分类控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};

/**
 * 删除分类
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return res.status(400).json({
        code: 4000,
        message: '无效的分类ID',
      });
    }

    await deleteCategory(categoryId);

    res.success(null, '分类删除成功');
  } catch (error) {
    console.log(chalk.red('删除分类控制器错误:', error.message));
    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};
