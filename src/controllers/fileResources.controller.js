import {
  batchCleanupFiles,
  getFileResourceStats,
  getFilesToCleanup,
  getFilesToCleanupWithPagination,
  markFileStatus,
  getAllFileResources, batchByIdFile,
} from '../services/fileResources.service.js';
import chalk from 'chalk';

/**
 * 文件资源控制器类
 * 负责处理文件资源相关的HTTP请求
 */
class FileResourcesController {
  /**
   * 获取文件资源统计信息
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async getStats(req, res) {
    try {
      const stats = await getFileResourceStats();

      res.json({
        success: true,
        data: stats,
        message: '获取文件统计成功',
      });
    } catch (error) {
      console.error('[获取文件统计失败]', error);
      res.status(500).json({
        success: false,
        message: '获取文件统计失败',
        error: error.message,
      });
    }
  }

  /**
   * 获取待清理文件列表
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async getCleanupList(req, res) {
    try {
      const { current = 1, pageSize = 20 } = req.query;

      const options = {
        current: parseInt(current),
        pageSize: parseInt(pageSize),
      };

      const result = await getFilesToCleanupWithPagination(options);

      res.success(result, '获取待清理文件列表');
    } catch (error) {
      console.error('[获取待清理文件列表失败]', error);
      res.status(500).json({
        code: 5000,
        message: '获取待清理文件列表失败',
        error: error.message,
      });
    }
  }

  /**
   * 手动执行文件清理
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async manualCleanup(req, res) {
    try {
      const { batchSize = 50 } = req.body;

      console.log(chalk.blue('[手动文件清理] 开始执行'));
      const result = await batchCleanupFiles(parseInt(batchSize));

      res.json({
        success: true,
        data: result,
        message: `文件清理完成，总计: ${result.total}, 成功: ${result.success}, 失败: ${result.failed}`,
      });
    } catch (error) {
      console.error('[手动文件清理失败]', error);
      res.status(500).json({
        success: false,
        message: '手动文件清理失败',
        error: error.message,
      });
    }
  }

  /**
   * 标记文件为已使用
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async markAsUsed(req, res) {
    try {
      const { fileUrl } = req.body;

      if (!fileUrl) {
        return res.status(400).json({
          success: false,
          message: '缺少必要参数: fileUrl',
        });
      }

      const success = await markFileStatus(fileUrl, 'active');

      if (success) {
        res.json({
          success: true,
          message: '文件标记为已使用成功',
        });
      } else {
        res.status(500).json({
          success: false,
          message: '文件标记为已使用失败',
        });
      }
    } catch (error) {
      console.error('[标记文件为已使用失败]', error);
      res.status(500).json({
        success: false,
        message: '标记文件为已使用失败',
        error: error.message,
      });
    }
  }

  /**
   * 标记文件为未使用
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async markAsUnused(req, res) {
    try {
      const { fileUrl } = req.body;

      if (!fileUrl) {
        return res.status(400).json({
          success: false,
          message: '缺少必要参数: fileUrl',
        });
      }

      const success = await markFileStatus(fileUrl, 'unused');

      if (success) {
        res.json({
          success: true,
          message: '文件标记为未使用成功',
        });
      } else {
        res.status(500).json({
          success: false,
          message: '文件标记为未使用失败',
        });
      }
    } catch (error) {
      console.error('[标记文件为未使用失败]', error);
      res.status(500).json({
        success: false,
        message: '标记文件为未使用失败',
        error: error.message,
      });
    }
  }

  /**
   * 分页获取所有文件资源数据
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async getAllFiles(req, res) {
    try {
      const { current = 1, pageSize = 20, status, storageProvider } = req.query;

      const options = {
        current: parseInt(current),
        pageSize: parseInt(pageSize),
        status,
        storageProvider,
      };

      const result = await getAllFileResources(options);

      res.success(result, '获取文件资源列表');
    } catch (error) {
      console.error('[获取文件资源列表失败]', error);
      res.status(500).json({
        success: false,
        message: '获取文件资源列表失败',
        error: error.message,
      });
    }
  }

  /**
   * 定时清理任务（内部调用）
   * 这个函数可以被定时任务调用
   */
  async scheduledCleanup() {
    try {
      console.log(chalk.blue('[定时文件清理] 开始执行'));
      const result = await batchCleanupFiles(100); // 每次清理100个文件

      console.log(
        chalk.green(
          `[定时文件清理] 完成，总计: ${result.total}, 成功: ${result.success}, 失败: ${result.failed}`
        )
      );
      return result;
    } catch (error) {
      console.error('[定时文件清理失败]', error);
      return { total: 0, success: 0, failed: 0 };
    }
  }

  async cleanFiles(req,res){
    const {ids} = req.body
    if(!ids||ids.length===0){
      return res.error('参数错误')
    }
    console.log('=========')
    console.error(ids)
   const length =  await batchByIdFile(ids)

    res.success({success:length,error:ids.length-length},'操作成功                                                                                                                                                                                            ')
  }
}

// 创建控制器实例并导出
const fileResourcesController = new FileResourcesController();
export default fileResourcesController;
