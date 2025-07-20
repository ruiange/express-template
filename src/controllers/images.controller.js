// images.controller.js

import { addImageService } from '../services/images.service.js';
import { uploadController } from './upload.controller.js';
import { r2Upload } from '../services/upload.service.js';

export const addImage =  async (req, res) => {

  const file = req.file;
  const path = req.body.path || 'default';
  const  url = await r2Upload(file, path);
  const result = await addImageService(url, name);

}