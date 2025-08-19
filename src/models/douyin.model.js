import mongoose from 'mongoose';

const douyinSchema = new mongoose.Schema(
  {
    jsonData: {
      type: Object,
      required: true,
    },
    dyId:{
      type: String,
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  }
);

const Douyin = mongoose.model('Douyin', douyinSchema);
export default Douyin;
