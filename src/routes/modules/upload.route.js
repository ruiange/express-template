import express from 'express';
import multer from 'multer';
import { deleteVercelBlob, uploadController } from '../../controllers/upload.controller.js';

const uploadRoute = express.Router();
const upload = multer();
/**
 * @api {post} /upload 上传文件
 * @apiName UploadFile
 * @apiGroup 上传
 * @apiDescription Upload a file to the server
 *
 * @apiParam {File} file The file to upload
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {String} filename Uploaded file name
 *
 * @apiError (Error 400) BadRequest Invalid file format
 * @apiError (Error 500) InternalServerError Server error
 */
uploadRoute.post('/', upload.single('file'), uploadController);


uploadRoute.delete('/', deleteVercelBlob);

export default uploadRoute;