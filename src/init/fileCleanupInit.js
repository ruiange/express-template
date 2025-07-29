import fileCleanupScheduler from '../tasks/fileCleanupScheduler.js';
import chalk from 'chalk';

/**
 * 初始化文件清理系统
 * 在应用启动时调用此函数
 */
export const initFileCleanup = () => {
  try {
    // 启动定时清理任务（每天凌晨2点执行）
    fileCleanupScheduler.start('0 2 * * *');
    
    console.log(chalk.green('[文件清理系统] 初始化完成'));
    console.log(chalk.blue('[文件清理系统] 定时任务已启动，每天凌晨2点执行清理'));
    
    // 可选：应用启动时执行一次清理（如果需要的话）
    // setTimeout(async () => {
    //   try {
    //     console.log(chalk.blue('[文件清理系统] 执行启动时清理'));
    //     await fileCleanupScheduler.triggerManual();
    //   } catch (error) {
    //     console.error(chalk.red('[文件清理系统] 启动时清理失败:'), error);
    //   }
    // }, 5000); // 延迟5秒执行，确保应用完全启动
    
  } catch (error) {
    console.error(chalk.red('[文件清理系统] 初始化失败:'), error);
  }
};

/**
 * 优雅关闭文件清理系统
 * 在应用关闭时调用此函数
 */
export const shutdownFileCleanup = () => {
  try {
    fileCleanupScheduler.stop();
    console.log(chalk.yellow('[文件清理系统] 已停止'));
  } catch (error) {
    console.error(chalk.red('[文件清理系统] 停止失败:'), error);
  }
};