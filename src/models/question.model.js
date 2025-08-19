import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 255
    },
    desc: {
      type: String
    },
    answer: {
      type: String
    },
    analysis: {
      type: String
    },
    difficulty: {
      type: Number,
      default: 3,
      min: 1,
      max: 5
    },
    category: {
      type: String,
      maxLength: 100
    },
    tags: {
      type: String,
      maxLength: 255
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'questions'
  }
);

const Question = mongoose.model('Question', questionSchema);
export default Question;
