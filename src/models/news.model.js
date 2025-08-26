import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    news_id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      maxLength: 255
    },
    content: {
      type: String
    },
    type: {
      type: String,
      maxLength: 255
    },
    url: {
      type: String
    },
    time: {
      type: String
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'jiuyin_news'
  }
);

const News = mongoose.model('News', newsSchema);
export default News;

