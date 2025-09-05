import mongoose from 'mongoose';

const wealthSchema = new mongoose.Schema(
  {
    openid: {
      type: String,
      required: true,
      unique: true,
      maxLength: 255
    },
    // 在MongoDB中，我们可以使用Decimal128来处理高精度数字
    // 或者使用Number类型（JavaScript的Number类型支持IEEE 754双精度浮点数）
    count: {
      type: Number,
      required: true,
      default: 0
    },
    muyu: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'wealth'
  }
);

const Wealth = mongoose.model('Wealth', wealthSchema);
export default Wealth;

