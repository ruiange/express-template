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
} from '../services/wallpaper.service.js';

/**
 * 创建壁纸
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const createWallpaperController = async (req, res) => {
  try {
    const {
      title,
      description,
      filePath,
      thumbnailPath,
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
        message: '请先上传壁纸',
      });
    }

    const wallpaperData = {
      title,
      description,
      filePath,
      thumbnailPath,
      fileSize: fileSize ? parseInt(fileSize) : null,
      width: width ? parseInt(width) : null,
      height: height ? parseInt(height) : null,
      fileType,
      categoryId: categoryId ? parseInt(categoryId) : null,
      isPublic: Boolean(isPublic),
    };

    const newWallpaper = await createWallpaper(wallpaperData);

    res.status(201).json({
      code: 2000,
      message: '壁纸创建成功',
      data: newWallpaper,
    });
  } catch (error) {
    console.log(chalk.red('创建壁纸控制器错误:', error.message));
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
    console.log(info.filePath);
    //    await deleteWallpaper(wallpaperId);

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

// ==================== 分类相关控制器 ====================

/**
 * 创建分类
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log('创建分类:', name, description);
    if (!name) {
      return res.status(400).json({
        code: 4000,
        message: '分类名称为必填项',
      });
    }

    const categoryData = {
      name,
      description: description || null,
    };

    const newCategory = await createCategory(categoryData);

    res.status(201).json({
      code: 2000,
      message: '分类创建成功',
      data: newCategory,
    });
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
  console.log(chalk.green('获取所有分类'));
  try {
    const categories = (await getAllCategories()) || [];

    res.success(categories, '获取所有分类成功');
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

    res.json({
      code: 2000,
      message: '分类删除成功',
    });
  } catch (error) {
    console.log(chalk.red('删除分类控制器错误:', error.message));

    if (error.message === '该分类下还有壁纸，无法删除') {
      return res.status(400).json({
        code: 4000,
        message: error.message,
      });
    }

    res.status(500).json({
      code: 5000,
      message: '服务器内部错误',
      error: error.message,
    });
  }
};
