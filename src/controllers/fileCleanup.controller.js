import {
  batchCleanupFiles,
  getFileResourceStats,
  getFilesToCleanup,
  markFileAsUsed,
  markFileAsUnused
} from '../services/fileResource.service.js';
import chalk from 'chalk';

/**
 * 获取文件资源统计信息
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getStats = async (req, res) => {
  try {
    const stats = await getFileResourceStats();
    
    res.json({
      success: true,
      data: stats,
      message: '获取文件统计成功'
    });
  } catch (error) {
    console.error('[获取文件统计失败]', error);
    res.status(500).json({
      success: false,
      message: '获取文件统计失败',
      error: error.message
    });
  }
};

/**
 * 获取待清理文件列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const getCleanupList = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const files = await getFilesToCleanup(parseInt(limit));
    
    res.json({
      success: true,
      data: {
        files,
        count: files.length
      },
      message: '获取待清理文件列表成功'
    });
  } catch (error) {
    console.error('[获取待清理文件列表失败]', error);
    res.status(500).json({
      success: false,
      message: '获取待清理文件列表失败',
      error: error.message
    });
  }
};

/**
 * 手动执行文件清理
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const manualCleanup = async (req, res) => {
  try {
    const { batchSize = 50 } = req.body;
    
    console.log(chalk.blue('[手动文件清理] 开始执行'));
    const result = await batchCleanupFiles(parseInt(batchSize));
    
    res.json({
      success: true,
      data: result,
      message: `文件清理完成，总计: ${result.total}, 成功: ${result.success}, 失败: ${result.failed}`
    });
  } catch (error) {
    console.error('[手动文件清理失败]', error);
    res.status(500).json({
      success: false,
      message: '手动文件清理失败',
      error: error.message
    });
  }
};

/**
 * 标记文件为已使用
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const markAsUsed = async (req, res) => {
  try {
    const { fileUrl } = req.body;
    
    if (!fileUrl) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数: fileUrl'
      });
    }
    
    const success = await markFileAsUsed(fileUrl);
    
    if (success) {
      res.json({
        success: true,
        message: '文件标记为已使用成功'
      });
    } else {
      res.status(500).json({
        success: false,
        message: '文件标记为已使用失败'
      });
    }
  } catch (error) {
    console.error('[标记文件为已使用失败]', error);
    res.status(500).json({
      success: false,
      message: '标记文件为已使用失败',
      error: error.message
    });
  }
};

/**
 * 标记文件为未使用
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export const markAsUnused = async (req, res) => {
  try {
    const { fileUrl } = req.body;
    
    if (!fileUrl) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数: fileUrl'
      });
    }
    
    const success = await markFileAsUnused(fileUrl);
    
    if (success) {
      res.json({
        success: true,
        message: '文件标记为未使用成功'
      });
    } else {
      res.status(500).json({
        success: false,
        message: '文件标记为未使用失败'
      });
    }
  } catch (error) {
    console.error('[标记文件为未使用失败]', error);
    res.status(500).json({
      success: false,
      message: '标记文件为未使用失败',
      error: error.message
    });
  }
};

/**
 * 定时清理任务（内部调用）
 * 这个函数可以被定时任务调用
 */
export const scheduledCleanup = async () => {
  try {
    console.log(chalk.blue('[定时文件清理] 开始执行'));
    const result = await batchCleanupFiles(100); // 每次清理100个文件
    
    console.log(chalk.green(`[定时文件清理] 完成，总计: ${result.total}, 成功: ${result.success}, 失败: ${result.failed}`));
    return result;
  } catch (error) {
    console.error('[定时文件清理失败]', error);
    return { total: 0, success: 0, failed: 0 };
  }
};