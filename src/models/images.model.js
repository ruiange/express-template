import mongoose from 'mongoose';

const imagesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 255
    },
    url: {
      type: String,
      required: true,
      maxLength: 255
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'images'
  }
);

const Images = mongoose.model('Images', imagesSchema);
export default Images;

