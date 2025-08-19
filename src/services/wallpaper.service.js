// wallpaper.service.js

import { Category, Wallpaper } from '../models/wallpaper.model.js';
import chalk from 'chalk';

/**
 * 创建壁纸
 * @param {Object} wallpaperData - 壁纸数据
 * @returns {Promise<Object>} - 创建的壁纸对象
 */
export const createWallpaper = async (wallpaperData) => {
  try {
    const newWallpaper = new Wallpaper(wallpaperData);
    await newWallpaper.save();
    return newWallpaper;
  } catch (error) {
    console.log(chalk.red('创建壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 根据ID获取壁纸
 * @param {string} id - 壁纸ID
 * @returns {Promise<Object>} - 壁纸对象
 */
export const getWallpaperById = async (id) => {
  try {
    const wallpaper = await Wallpaper.findById(id);

    if (!wallpaper) {
      return null;
    }

    // 增加浏览次数
    await Wallpaper.findByIdAndUpdate(id, {
      $inc: { viewCount: 1 }
    });

    return wallpaper;
  } catch (error) {
    console.log(chalk.red('获取壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 获取所有壁纸（支持分页、搜索、分类筛选）
 * @param {Object} options - 查询选项
 * @param {number} options.page - 页码，默认为1（内部使用，对应前端的current参数）
 * @param {number} options.limit - 每页数量，默认为10（内部使用，对应前端的pageSize参数）
 * @param {string} options.search - 搜索关键词
 * @param {string} options.categoryId - 分类ID
 * @param {boolean} options.isPublic - 是否公开
 * @param {string} options.sortBy - 排序字段 (uploadDate, viewCount, downloadCount)
 * @param {string} options.sortOrder - 排序方向 (asc, desc)
 * @returns {Promise<Object>} - 壁纸列表和分页信息
 */
export const getAllWallpapers = async (options = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      categoryId,
      isPublic = true,
      sortBy = 'uploadDate',
      sortOrder = 'desc',
    } = options;

    const skip = (page - 1) * limit;

    console.log(
      chalk.yellow('getAllWallpapers 参数:', {
        page,
        limit,
        search,
        categoryId,
        isPublic,
        sortBy,
        sortOrder,
      })
    );

    // 构建查询条件
    const query = {};

    // 添加搜索条件
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 添加分类筛选
    if (categoryId) {
      query.categoryId = categoryId;
    }

    // 添加公开状态筛选
    if (isPublic !== undefined) {
      query.isPublic = isPublic;
    }

    // 获取总数
    const total = await Wallpaper.countDocuments(query);
    console.log(chalk.yellow('总记录数:', total));

    // 构建排序条件
    const sort = {};
    switch (sortBy) {
      case 'viewCount':
        sort.viewCount = sortOrder === 'asc' ? 1 : -1;
        break;
      case 'downloadCount':
        sort.downloadCount = sortOrder === 'asc' ? 1 : -1;
        break;
      case 'uploadDate':
      default:
        sort.uploadDate = sortOrder === 'asc' ? 1 : -1;
        break;
    }

    // 获取分页数据
    const wallpaperList = await Wallpaper.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip);

    console.log(chalk.yellow('查询到的壁纸数量:', wallpaperList.length));

    return {
      wallpapers: wallpaperList,
      pagination: {
        currentPage: page,
        pageSize: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.log(chalk.red('getAllWallpapers 错误:', error.message));
    throw error;
  }
};

/**
 * 根据IDs批量查询壁纸数据
 * @param {Array} ids - 壁纸ID数组
 * @returns {Promise<Array>} - 壁纸对象数组
 */
export const getWallpapersByIds = async (ids) => {
  return Wallpaper.find({ _id: { $in: ids } });
};

/**
 * 更新壁纸信息
 * @param {string} id - 壁纸ID
 * @param {Object} wallpaperData - 需要更新的壁纸数据
 * @returns {Promise<Object>} - 更新后的壁纸对象
 */
export const updateWallpaper = async (id, wallpaperData) => {
  try {
    const updatedWallpaper = await Wallpaper.findByIdAndUpdate(
      id,
      wallpaperData,
      { new: true, runValidators: true }
    );
    return updatedWallpaper;
  } catch (error) {
    console.log(chalk.red('更新壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 获取每日壁纸
 * @param {string} date - 日期 (YYYY-MM-DD格式)，可选，默认为今天
 * @returns {Promise<Object>} - 每日壁纸对象
 */
export const getDailyWallpaper = async (date) => {
  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // 使用日期作为种子生成伪随机数，确保同一天返回相同的壁纸
    const dateNumber = parseInt(targetDate.replace(/-/g, ''));
    
    // 获取所有公开的壁纸总数
    const count = await Wallpaper.countDocuments({ isPublic: true });
    
    if (count === 0) {
      return null;
    }
    
    // 基于日期计算偏移量
    const skip = dateNumber % count;
    
    // 获取该偏移量对应的壁纸
    const dailyWallpaper = await Wallpaper.findOne({ isPublic: true })
      .sort({ _id: 1 })
      .skip(skip);
    
    return dailyWallpaper || null;
  } catch (error) {
    console.log(chalk.red('获取每日壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 删除壁纸
 * @param {string} id - 壁纸ID
 * @returns {Promise<void>}
 */
export const deleteWallpaper = async (id) => {
  try {
    await Wallpaper.findByIdAndDelete(id);
  } catch (error) {
    console.log(chalk.red('删除壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 批量删除壁纸
 * @param {Array} ids - 壁纸ID数组
 * @returns {Promise<Object>} - 删除结果对象，包含成功状态、删除数量和删除的ID列表
 */
export const batchDeleteWallpaper = async (ids) => {
  try {
    // 使用 deleteMany 方法批量删除壁纸
    const result = await Wallpaper.deleteMany({ _id: { $in: ids } });
    
    return {
      success: true,
      deletedCount: result.deletedCount,
      deletedIds: ids, // MongoDB deleteMany 不返回删除的文档，所以返回原始 ids
    };
  } catch (error) {
    console.log(chalk.red('批量删除壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 增加下载次数
 * @param {string} id - 壁纸ID
 * @returns {Promise<void>}
 */
export const incrementDownloadCount = async (id) => {
  try {
    await Wallpaper.findByIdAndUpdate(id, {
      $inc: { downloadCount: 1 }
    });
  } catch (error) {
    console.log(chalk.red('增加下载次数错误:', error.message));
    throw error;
  }
};

/**
 * 获取热门壁纸
 * @param {number} limit - 返回数量，默认为10
 * @returns {Promise<Array>} - 热门壁纸列表
 */
export const getPopularWallpapers = async (limit = 10) => {
  try {
    return await Wallpaper.find({ isPublic: true })
      .sort({ viewCount: -1 })
      .limit(limit);
  } catch (error) {
    console.log(chalk.red('获取热门壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 获取最新壁纸
 * @param {number} limit - 返回数量，默认为10
 * @returns {Promise<Array>} - 最新壁纸列表
 */
export const getLatestWallpapers = async (limit = 10) => {
  try {
    return await Wallpaper.find({ isPublic: true })
      .sort({ uploadDate: -1 })
      .limit(limit);
  } catch (error) {
    console.log(chalk.red('获取最新壁纸错误:', error.message));
    throw error;
  }
};

// ==================== 分类相关服务 ====================

/**
 * 创建分类
 * @param {Object} categoryData - 分类数据
 * @returns {Promise<Object>} - 创建的分类对象
 */
export const createCategory = async (categoryData) => {
  try {
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return newCategory;
  } catch (error) {
    console.log(chalk.red('创建分类错误:', error.message));
    throw error;
  }
};

/**
 * 获取所有分类
 * @returns {Promise<Array>} - 分类列表
 */
export const getAllCategories = async () => {
  try {
    const categoryList = await Category.find().sort({ _id: 1 });
    return categoryList;
  } catch (error) {
    console.log(chalk.red('获取分类列表错误:', error.message));
    throw error;
  }
};

/**
 * 根据ID获取分类
 * @param {string} id - 分类ID
 * @returns {Promise<Object>} - 分类对象
 */
export const getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    return category || null;
  } catch (error) {
    console.log(chalk.red('获取分类错误:', error.message));
    throw error;
  }
};

/**
 * 更新分类
 * @param {string} id - 分类ID
 * @param {Object} categoryData - 需要更新的分类数据
 * @returns {Promise<Object>} - 更新后的分类对象
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      categoryData,
      { new: true, runValidators: true }
    );
    return updatedCategory;
  } catch (error) {
    console.log(chalk.red('更新分类错误:', error.message));
    throw error;
  }
};

/**
 * 删除分类
 * @param {string} id - 分类ID
 * @returns {Promise<void>}
 */
export const deleteCategory = async (id) => {
  try {
    // 检查是否有壁纸使用此分类
    const wallpapersInCategory = await Wallpaper.find({ categoryId: id });

    if (wallpapersInCategory.length > 0) {
      throw new Error('该分类下还有壁纸，无法删除');
    }

    await Category.findByIdAndDelete(id);
  } catch (error) {
    console.log(chalk.red('删除分类错误:', error.message));
    throw error;
  }
};