import cron from 'node-cron';
import { scheduledCleanup } from '../controllers/fileCleanup.controller.js';
import chalk from 'chalk';

/**
 * 文件清理定时任务调度器
 * 默认每天凌晨2点执行一次清理任务
 */
class FileCleanupScheduler {
  constructor() {
    this.task = null;
    this.isRunning = false;
  }

  /**
   * 启动定时任务
   * @param {string} cronExpression - cron表达式，默认每天凌晨2点
   */
  start(cronExpression = '0 2 * * *') {
    if (this.task) {
      console.log(chalk.yellow('[文件清理调度器] 任务已在运行中'));
      return;
    }

    this.task = cron.schedule(cronExpression, async () => {
      if (this.isRunning) {
        console.log(chalk.yellow('[文件清理调度器] 上一个任务仍在执行中，跳过本次执行'));
        return;
      }

      this.isRunning = true;
      try {
        console.log(chalk.blue('[文件清理调度器] 开始执行定时清理任务'));
        const result = await scheduledCleanup();
        console.log(chalk.green(`[文件清理调度器] 定时任务完成: ${JSON.stringify(result)}`));
      } catch (error) {
        console.error(chalk.red('[文件清理调度器] 定时任务执行失败:'), error);
      } finally {
        this.isRunning = false;
      }
    }, {
      scheduled: false,
      timezone: 'Asia/Shanghai'
    });

    this.task.start();
    console.log(chalk.green(`[文件清理调度器] 定时任务已启动，执行时间: ${cronExpression}`));
  }

  /**
   * 停止定时任务
   */
  stop() {
    if (this.task) {
      this.task.stop();
      this.task = null;
      console.log(chalk.yellow('[文件清理调度器] 定时任务已停止'));
    }
  }

  /**
   * 获取任务状态
   */
  getStatus() {
    return {
      isScheduled: !!this.task,
      isRunning: this.isRunning
    };
  }

  /**
   * 手动触发一次清理任务
   */
  async triggerManual() {
    if (this.isRunning) {
      throw new Error('清理任务正在执行中，请稍后再试');
    }

    this.isRunning = true;
    try {
      console.log(chalk.blue('[文件清理调度器] 手动触发清理任务'));
      const result = await scheduledCleanup();
      console.log(chalk.green(`[文件清理调度器] 手动任务完成: ${JSON.stringify(result)}`));
      return result;
    } finally {
      this.isRunning = false;
    }
  }
}

// 创建全局实例
const fileCleanupScheduler = new FileCleanupScheduler();

export default fileCleanupScheduler;

// 导出类以便测试
export { FileCleanupScheduler };