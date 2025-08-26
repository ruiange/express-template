import mongoose from 'mongoose';

const goodsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 255
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'goodss' // 保持与原schema相同的表名
  }
);

const Goods = mongoose.model('Goods', goodsSchema);
export default Goods;

