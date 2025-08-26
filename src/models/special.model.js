import mongoose from 'mongoose';

// 定义专题Schema结构
const specialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100, // 专题名称，最大长度100字符
      trim: true, // 自动去除首尾空格
    },
    icon: {
      type: String,
      maxLength: 255, // 专题图标URL，最大长度255字符
    },
    description: {
      type: String,
      maxLength: 500, // 专题描述，最大长度500字符
    },
    questionBank: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question', // 引用Question模型
          required: true,
        },
        sort: {
          type: Number,
          default: 0, // 排序字段，数字越小排序越靠前
        },
        _id: false, // 不为数组元素生成_id
      }
    ],
    isActive: {
      type: Boolean,
      default: true, // 专题是否激活
    },
    totalQuestions: {
      type: Number,
      default: 0, // 题库中题目总数
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'specials', // 指定集合名称为'specials'
  }
);

// 添加索引
specialSchema.index({ name: 1 }); // 为名称字段添加索引
specialSchema.index({ isActive: 1 }); // 为激活状态添加索引
specialSchema.index({ 'questionBank.sort': 1 }); // 为题库排序字段添加索引

// 添加虚拟字段：获取题库数量
specialSchema.virtual('questionCount').get(function() {
  return this.questionBank.length;
});

// 中间件：保存前更新题目总数
specialSchema.pre('save', function(next) {
  this.totalQuestions = this.questionBank.length;
  next();
});

// 实例方法：添加题目到题库
specialSchema.methods.addQuestion = function(questionId, sort = 0) {
  const existingQuestion = this.questionBank.find(q => q.questionId.toString() === questionId.toString());
  if (existingQuestion) {
    throw new Error('题目已存在于该专题中');
  }
  
  this.questionBank.push({
    questionId,
    sort
  });
  
  // 按排序字段排序
  this.questionBank.sort((a, b) => a.sort - b.sort);
  
  return this.save();
};

// 实例方法：从题库中移除题目
specialSchema.methods.removeQuestion = function(questionId) {
  this.questionBank = this.questionBank.filter(q => q.questionId.toString() !== questionId.toString());
  return this.save();
};

// 实例方法：更新题目排序
specialSchema.methods.updateQuestionSort = function(questionId, newSort) {
  const question = this.questionBank.find(q => q.questionId.toString() === questionId.toString());
  if (!question) {
    throw new Error('题目不存在于该专题中');
  }
  
  question.sort = newSort;
  
  // 重新排序
  this.questionBank.sort((a, b) => a.sort - b.sort);
  
  return this.save();
};

// 静态方法：根据名称查找专题
specialSchema.statics.findByName = function(name) {
  return this.findOne({ name: name, isActive: true });
};

// 静态方法：获取所有激活的专题
specialSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

// 创建并导出Special模型
const Special = mongoose.model('Special', specialSchema);
export default Special;
