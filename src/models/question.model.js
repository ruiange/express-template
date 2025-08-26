import mongoose from 'mongoose';

// 定义题目Schema结构
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 255, // 题目标题，最大长度255字符
    },
    desc: {
      type: String, // 题目描述
    },
    answer: {
      type: String, // 题目答案
    },
    analysis: {
      type: String, // 题目解析
    },
    difficulty: {
      type: Number, //  1-简单 2-中等 3-困难 4-超难 5-极难
      default: 3, // 默认难度为3
      min: 1, // 最小难度为1
      max: 5, // 最大难度为5
    },
    category: {
      type: String,
      maxLength: 100, // 题目分类，最大长度100字符
    },
    tags: {
      type: Array,
      maxLength: 255, // 题目标签，最大长度255字符
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'questions', // 指定集合名称为'questions'
  }
);

// 创建并导出Question模型
const Question = mongoose.model('Question', questionSchema);
export default Question;

