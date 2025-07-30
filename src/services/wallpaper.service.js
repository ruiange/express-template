// wallpaper.service.js

import { categories, wallpapers } from '../db/schemas/wallpaper.schema.js';
import { and, asc, desc, eq, inArray, like, or, sql } from 'drizzle-orm';
import { db } from '../config/db.js';
import chalk from 'chalk';

/**
 * 创建壁纸
 * @param {Object} wallpaperData - 壁纸数据
 * @returns {Promise<Object>} - 创建的壁纸对象
 */
export const createWallpaper = async (wallpaperData) => {
  try {
    const [newWallpaper] = await db.insert(wallpapers).values(wallpaperData).returning().execute();
    return newWallpaper;
  } catch (error) {
    console.log(chalk.red('创建壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 根据ID获取壁纸
 * @param {number} id - 壁纸ID
 * @returns {Promise<Object>} - 壁纸对象
 */
export const getWallpaperById = async (id) => {
  try {
    const wallpaper = await db.select().from(wallpapers).where(eq(wallpapers.id, id)).execute();

    if (!wallpaper[0]) {
      return null;
    }

    // 增加浏览次数
    await db
      .update(wallpapers)
      .set({ viewCount: sql`${wallpapers.viewCount} + 1` })
      .where(eq(wallpapers.id, id))
      .execute();

    return wallpaper[0];
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
 * @param {number} options.categoryId - 分类ID
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

    const offset = (page - 1) * limit;

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

    let query = db.select().from(wallpapers);
    let whereConditions = [];

    // 添加搜索条件
    if (search) {
      whereConditions.push(
        or(like(wallpapers.title, `%${search}%`), like(wallpapers.description, `%${search}%`))
      );
    }

    // 添加分类筛选
    if (categoryId) {
      whereConditions.push(eq(wallpapers.categoryId, categoryId));
    }

    // 添加公开状态筛选
    if (isPublic !== undefined) {
      whereConditions.push(eq(wallpapers.isPublic, isPublic));
    }

    // 应用所有条件
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // 获取总数
    let countQuery = db.select({ count: sql`count(*)` }).from(wallpapers);
    if (whereConditions.length > 0) {
      countQuery = countQuery.where(and(...whereConditions));
    }

    const [{ count }] = await countQuery.execute();
    console.log(chalk.yellow('总记录数:', count));

    // 排序
    let orderByClause;
    switch (sortBy) {
      case 'viewCount':
        orderByClause =
          sortOrder === 'asc' ? asc(wallpapers.viewCount) : desc(wallpapers.viewCount);
        break;
      case 'downloadCount':
        orderByClause =
          sortOrder === 'asc' ? asc(wallpapers.downloadCount) : desc(wallpapers.downloadCount);
        break;
      case 'uploadDate':
      default:
        orderByClause =
          sortOrder === 'asc' ? asc(wallpapers.uploadDate) : desc(wallpapers.uploadDate);
        break;
    }

    // 获取分页数据
    const wallpaperList = await query.orderBy(orderByClause).limit(limit).offset(offset).execute();

    console.log(chalk.yellow('查询到的壁纸数量:', wallpaperList.length));

    return {
      wallpapers: wallpaperList,
      pagination: {
        currentPage: page,
        pageSize: limit,
        total: parseInt(count),
        totalPages: Math.ceil(parseInt(count) / limit),
      },
    };
  } catch (error) {
    console.log(chalk.red('getAllWallpapers 错误:', error.message));
    throw error;
  }
};

/**
 * 更加ids批量查询数据
 * @param {Array} ids - ids
 * @returns {Promise<Array>}
 */
export const getWallpapersByIds =async (ids) => {
  return db.select().from(wallpapers).where(inArray(wallpapers.id, ids));
};

/**
 * 更新壁纸信息
 * @param {number} id - 壁纸ID
 * @param {Object} wallpaperData - 需要更新的壁纸数据
 * @returns {Promise<Object>} - 更新后的壁纸对象
 */
export const updateWallpaper = async (id, wallpaperData) => {
  try {
    const updatedWallpaper = await db
      .update(wallpapers)
      .set(wallpaperData)
      .where(eq(wallpapers.id, id))
      .returning()
      .execute();
    return updatedWallpaper[0];
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
    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(wallpapers)
      .where(eq(wallpapers.isPublic, true))
      .execute();
    
    if (count === 0) {
      return null;
    }
    
    // 基于日期计算偏移量
    const offset = dateNumber % parseInt(count);
    
    // 获取该偏移量对应的壁纸
    const [dailyWallpaper] = await db
      .select()
      .from(wallpapers)
      .where(eq(wallpapers.isPublic, true))
      .orderBy(asc(wallpapers.id))
      .limit(1)
      .offset(offset)
      .execute();
    
    return dailyWallpaper || null;
  } catch (error) {
    console.log(chalk.red('获取每日壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 删除壁纸
 * @param {number} id - 壁纸ID
 * @returns {Promise<void>}
 */
export const deleteWallpaper = async (id) => {
  try {
    await db.delete(wallpapers).where(eq(wallpapers.id, id)).execute();
  } catch (error) {
    console.log(chalk.red('删除壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 批量删除壁纸
 */
export const batchDeleteWallpaper = async (ids) => {
  try {
    // 使用inArray方法批量删除壁纸
    const result = await db
      .delete(wallpapers)
      .where(inArray(wallpapers.id, ids))
      .returning({ id: wallpapers.id })
      .execute();
    return {
      success: true,
      deletedCount: result.length,
      deletedIds: result.map((item) => item.id),
    };
  } catch (error) {
    console.log(chalk.red('批量删除壁纸错误:', error.message));
    throw error;
  }
};

/**
 * 增加下载次数
 * @param {number} id - 壁纸ID
 * @returns {Promise<void>}
 */
export const incrementDownloadCount = async (id) => {
  try {
    await db
      .update(wallpapers)
      .set({ downloadCount: sql`${wallpapers.downloadCount} + 1` })
      .where(eq(wallpapers.id, id))
      .execute();
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
    const popularWallpapers = await db
      .select()
      .from(wallpapers)
      .where(eq(wallpapers.isPublic, true))
      .orderBy(desc(wallpapers.viewCount))
      .limit(limit)
      .execute();

    return popularWallpapers;
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
    const latestWallpapers = await db
      .select()
      .from(wallpapers)
      .where(eq(wallpapers.isPublic, true))
      .orderBy(desc(wallpapers.uploadDate))
      .limit(limit)
      .execute();

    return latestWallpapers;
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
    const [newCategory] = await db.insert(categories).values(categoryData).returning().execute();
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
    const categoryList = await db.select().from(categories).orderBy(asc(categories.id)).execute();

    return categoryList;
  } catch (error) {
    console.log(chalk.red('获取分类列表错误:', error.message));
    throw error;
  }
};

/**
 * 根据ID获取分类
 * @param {number} id - 分类ID
 * @returns {Promise<Object>} - 分类对象
 */
export const getCategoryById = async (id) => {
  try {
    const category = await db.select().from(categories).where(eq(categories.id, id)).execute();

    return category[0] || null;
  } catch (error) {
    console.log(chalk.red('获取分类错误:', error.message));
    throw error;
  }
};

/**
 * 更新分类
 * @param {number} id - 分类ID
 * @param {Object} categoryData - 需要更新的分类数据
 * @returns {Promise<Object>} - 更新后的分类对象
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const updatedCategory = await db
      .update(categories)
      .set(categoryData)
      .where(eq(categories.id, id))
      .returning()
      .execute();
    return updatedCategory[0];
  } catch (error) {
    console.log(chalk.red('更新分类错误:', error.message));
    throw error;
  }
};

/**
 * 删除分类
 * @param {number} id - 分类ID
 * @returns {Promise<void>}
 */
export const deleteCategory = async (id) => {
  try {
    // 检查是否有壁纸使用此分类
    const wallpapersInCategory = await db
      .select()
      .from(wallpapers)
      .where(eq(wallpapers.categoryId, id))
      .execute();

    if (wallpapersInCategory.length > 0) {
      throw new Error('该分类下还有壁纸，无法删除');
    }

    await db.delete(categories).where(eq(categories.id, id)).execute();
  } catch (error) {
    console.log(chalk.red('删除分类错误:', error.message));
    throw error;
  }
};
