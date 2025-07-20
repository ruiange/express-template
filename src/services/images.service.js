// images.service.js
import { db } from '../config/db.js';
import { imagesTable } from '../db/schemas/images.schema.js';

export const addImageService = async (url, name) => {
  try {
    const [newUser] = await db.insert(imagesTable).values({ url, name }).returning().execute();
    return newUser;
  } catch (error) {
    throw error;
  }
};
