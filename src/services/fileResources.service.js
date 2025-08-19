import FileResources from '../models/fileResources.model.js';
import { deleteBlobService } from './upload.service.js';
import chalk from 'chalk';

/**
 * 记录文件资源
 * @param {Object} fileInfo - 文件信息
 * @param {string} fileInfo.fileName - 原始文件名
 * @param {string} fileInfo.fileUrl - 文件URL
 * @param {string} fileInfo.fileKey - 存储key
 * @param {number} fileInfo.fileSize - 文件大小
 * @param {string} fileInfo.mimeType - 文件类型
 * @param {string} fileInfo.storageProvider - 存储提供商
 * @param {string} fileInfo.storagePath - 存储路径
 * @returns {Promise<Object>} 创建的文件资源记录
 */
export const recordFileResource = async (fileInfo) => {
  try {
    const fileResource = new FileResources({
      fileName: fileInfo.fileName,
      fileUrl: fileInfo.fileUrl,
      fileKey: fileInfo.fileKey,
      fileSize: fileInfo.fileSize,
      mimeType: fileInfo.mimeType,
      storageProvider: fileInfo.storageProvider,
      storagePath: fileInfo.storagePath,
      status: 'pending',
    });

    await fileResource.save();
    console.log(chalk.blue(`[文件资源记录] ${fileInfo.fileName} - ${fileResource._id}`));
    return fileResource;
  } catch (error) {
    console.error('[文件资源记录失败]', error);
    throw error;
  }
};

/**
 * 更新文件使用状态
 * @param {string} fileUrl - 文件URL
 * @param {'active' | 'unused'} status - 文件状态
 * @returns {Promise<boolean>} 是否成功
 */
export const markFileStatus = async (fileUrl, status) => {
  try {
    // 更新文件状态
    await FileResources.updateMany(
      { fileUrl },
      {
        status,
        updatedAt: new Date(),
      }
    );

    const color = status === 'active' ? chalk.green : chalk.yellow;
    console.log(color(`[文件标记为${status === 'active' ? '已使用' : '未使用'}] ${fileUrl}`));
    return true;
  } catch (error) {
    console.error(`[标记文件${status === 'active' ? '使用' : '未使用'}失败]`, error);
    return false;
  }
};

/**
 * 批量更新文件使用状态
 * @param pathList 文件路径列表
 * @param {'active' | 'unused'} status - 文件状态
 * @returns {Promise<boolean>} 是否成功
 */
export const batchUpdateFileStatus = async (pathList, status) => {
  return FileResources.updateMany(
    { fileUrl: { $in: pathList } },
    {
      status: status,
      updatedAt: new Date(),
    }
  );
};

/**
 * 获取待清理的文件列表
 * @param {number} limit - 限制数量
 * @returns {Promise<Array>} 待清理的文件列表
 */
export const getFilesToCleanup = async (limit = 100) => {
  try {
    const files = await FileResources.find({
      canDelete: true,
      $or: [
        { status: 'unused' },
        {
          status: 'pending',
          createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // 24小时前的pending文件
        }
      ]
    }).limit(limit);

    return files;
  } catch (error) {
    console.error('[获取待清理文件失败]', error);
    return [];
  }
};

/**
 * 分页获取待清理的文件列表
 * @param {Object} options - 查询选项
 * @param {number} options.current - 当前页码，从1开始
 * @param {number} options.pageSize - 每页数量，默认20
 * @returns {Promise<Object>} 分页数据
 */
export const getFilesToCleanupWithPagination = async (options = {}) => {
  try {
    const { current = 1, pageSize = 20 } = options;

    const skip = (current - 1) * pageSize;

    // 构建查询条件
    const query = {
      canDelete: true,
      $or: [
        { status: 'unused' },
        {
          status: 'pending',
          createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // 24小时前的pending文件
        }
      ]
    };

    // 获取总数和分页数据
    const [totalCount, files] = await Promise.all([
      FileResources.countDocuments(query),
      FileResources.find(query)
        .sort({ createdAt: 1 })
        .limit(pageSize)
        .skip(skip)
    ]);

    return {
      list: files,
      pagination: {
        current,
        pageSize,
        total: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('[获取待清理文件分页列表失败]', error);
    return {
      list: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        totalPages: 0,
      },
    };
  }
};

/**
 * 清理单个文件
 * @param {Object} fileResource - 文件资源记录
 * @returns {Promise<boolean>} 是否成功
 */
export const cleanupSingleFile = async (fileResource) => {
  try {
    // 从存储服务删除文件
    const deleteSuccess = await deleteBlobService(fileResource.fileUrl);

    if (deleteSuccess) {
      // 更新数据库状态
      await FileResources.findByIdAndUpdate(
        fileResource._id,
        {
          status: 'deleted',
          updatedAt: new Date(),
        }
      );

      console.log(chalk.red(`[文件已清理] ${fileResource.fileName} - ${fileResource.fileUrl}`));
      return true;
    } else {
      console.warn(
        chalk.yellow(`[文件删除失败] ${fileResource.fileName} - ${fileResource.fileUrl}`)
      );
      return false;
    }
  } catch (error) {
    console.error('[清理文件失败]', error);
    return false;
  }
};

/**
 * 批量清理文件
 * @param {number} batchSize - 批次大小
 * @returns {Promise<Object>} 清理结果统计
 */
export const batchCleanupFiles = async (batchSize = 50) => {
  try {
    const filesToCleanup = await getFilesToCleanup(batchSize);

    if (filesToCleanup.length === 0) {
      console.log(chalk.blue('[文件清理] 没有需要清理的文件'));
      return { total: 0, success: 0, failed: 0 };
    }

    console.log(chalk.blue(`[文件清理开始] 共 ${filesToCleanup.length} 个文件待清理`));

    let successCount = 0;
    let failedCount = 0;

    for (const file of filesToCleanup) {
      const success = await cleanupSingleFile(file);
      if (success) {
        successCount++;
      } else {
        failedCount++;
      }

      // 添加小延迟避免过于频繁的操作
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const result = {
      total: filesToCleanup.length,
      success: successCount,
      failed: failedCount,
    };

    console.log(
      chalk.green(
        `[文件清理完成] 总计: ${result.total}, 成功: ${result.success}, 失败: ${result.failed}`
      )
    );
    return result;
  } catch (error) {
    console.error('[批量清理文件失败]', error);
    return { total: 0, success: 0, failed: 0 };
  }
};

/**
 * 获取文件资源统计信息
 * @returns {Promise<Object>} 统计信息
 */
export const getFileResourceStats = async () => {
  try {
    const stats = await FileResources.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      total: 0,
      pending: 0,
      active: 0,
      unused: 0,
      deleted: 0,
    };

    stats.forEach((stat) => {
      result[stat._id] = stat.count;
      result.total += stat.count;
    });

    return result;
  } catch (error) {
    console.error('[获取文件统计失败]', error);
    return { total: 0, pending: 0, active: 0, unused: 0, deleted: 0 };
  }
};

/**
 * 分页获取所有文件资源数据
 * @param {Object} options - 查询选项
 * @param {number} options.current - 当前页码，从1开始
 * @param {number} options.pageSize - 每页数量，默认20
 * @param {string} options.status - 文件状态过滤，可选
 * @param {string} options.storageProvider - 存储提供商过滤，可选
 * @returns {Promise<Object>} 分页数据
 */
export const getAllFileResources = async (options = {}) => {
  try {
    const { current = 1, pageSize = 20, status, storageProvider } = options;

    const skip = (current - 1) * pageSize;

    // 构建查询条件
    const query = {};
    if (status) {
      query.status = status;
    }
    if (storageProvider) {
      query.storageProvider = storageProvider;
    }

    // 获取总数和分页数据
    const [totalCount, files] = await Promise.all([
      FileResources.countDocuments(query),
      FileResources.find(query)
        .sort({ createdAt: 1 })
        .limit(pageSize)
        .skip(skip)
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      list: files,
      pagination: {
        current: current,
        pageSize: pageSize,
        total: totalCount,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    console.error('[分页获取文件资源失败]', error);
    throw error;
  }
};