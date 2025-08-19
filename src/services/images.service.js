// images.service.js
import Images from '../models/images.model.js';

export const addImageService = async (url, name) => {
  try {
    const newImage = new Images({ url, name });
    await newImage.save();
    return newImage;
  } catch (error) {
    throw error;
  }
};