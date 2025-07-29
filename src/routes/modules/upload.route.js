import express from 'express';
import multer from 'multer';
import {  uploadController } from '../../controllers/upload.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const uploadRoute = express.Router();
const upload = multer();
/**
 * @api {post} /upload 上传文件
 * @apiName UploadFile
 * @apiGroup 上传
 * @apiDescription 使用 multipart/form-data 类型的表单上传文件到服务器。
 *
 * @apiHeader {String} Content-Type 必须设置为 multipart/form-data
 *
 * @apiConsumes multipart/form-data
 *
 * @apiBody {File} [file] 要上传的文件（通过 multipart/form-data 表单提交）
 * @apiBody {String} [path] 文件保存的路径（可选）
 * @apiBody {String} [upType=vercel] 存储桶（可选）默认为vercel，可选vercel、qiniu、r2
 * @apiSuccess {String} filename 上传后的文件名
 * @apiSuccess {String} [url] 文件访问 URL（如果可用）
 *
 * @apiError (Error 400) BadRequest 无效的文件格式或未提供文件
 * @apiError (Error 413) PayloadTooLarge 文件大小超过限制
 * @apiError (Error 415) UnsupportedMediaType 不支持的媒体类型
 * @apiError (Error 500) InternalServerError 服务器处理文件时出错
 */

uploadRoute.post('/', upload.single('file'), uploadController);



export default uploadRoute;
