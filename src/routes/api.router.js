import express from 'express';
import nineYinRoute from './modules/nineYin.route.js';
import douyinRoute from './modules/douyin.route.js';
import miniRoute from './modules/mini.route.js';
import wealthRoute from './modules/wealth.route.js';
import userRoute from './modules/user.route.js';
import uploadRoute from './modules/upload.route.js';
import aiRoute from './modules/ai.route.js';
import wallpaperRoute from './modules/wallpaper.route.js';
import adminRoute from './admin/admin.route.js';
import questionRoute from './modules/question.route.js';
import fileResourcesRoute from './modules/fileResources.route.js';
import dashboardRoute from './modules/dashboard.route.js';
import healthRouter from './modules/health.route.js';
import publicRoute from './modules/public.route.js';
import voteRoute from './modules/vote.route.js';

// 创建主路由实例
const apiRouter = express.Router();

// 九阴真经相关路由 - 爬取九阴新闻等
apiRouter.use('/9yin', nineYinRoute);
// 抖音相关路由 - 解析抖音视频等
apiRouter.use('/douyin', douyinRoute);
// 小程序相关路由 - 小程序登录等
apiRouter.use('/mini', miniRoute);
// 财富相关路由 - 敲木鱼增加财富等
apiRouter.use('/wealth', wealthRoute);
// 用户相关路由 - 用户信息管理等
apiRouter.use('/user', userRoute);
// 文件上传相关路由 - 文件上传、删除等
apiRouter.use('/upload', uploadRoute);
// AI相关路由 - 起名宝等AI功能
apiRouter.use('/ai', aiRoute);
// 壁纸相关路由 - 获取壁纸等
apiRouter.use('/wallpaper', wallpaperRoute);
// 后台管理相关路由 - 管理员权限控制等
apiRouter.use('/admin', adminRoute);
// 题库相关路由 - 题目的增删改查
apiRouter.use('/question', questionRoute);
// 文件清理相关路由 - 统计、清理未使用的文件资源
apiRouter.use('/file-cleanup', fileResourcesRoute);
// 后台首页
apiRouter.use('/dashboard', dashboardRoute)
// 健康检查路由
apiRouter.use('/health', healthRouter);

apiRouter.use('/public',publicRoute)
// 投票相关路由 - 题目会/不会投票
apiRouter.use('/vote', voteRoute);
export default apiRouter;