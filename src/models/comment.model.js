import mongoose from 'mongoose';

// 定义评论Schema结构
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 1000, // 评论内容，最大长度1000字符
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question', // 关联Question表
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 关联User表
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // 父评论ID，用于回复功能（可选）
      default: null,
    },
    likes: {
      type: Number,
      default: 0, // 点赞数，默认为0
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0, // 踩数，默认为0
      min: 0,
    },
    status: {
      type: String,
      enum: ['active', 'hidden', 'deleted'], // 评论状态：活跃、隐藏、已删除
      default: 'active',
    },
    isTop: {
      type: Boolean,
      default: false, // 是否置顶
    },
    ipAddress: {
      type: String,
      maxLength: 45, // IP地址（支持IPv6）
    },
    userAgent: {
      type: String,
      maxLength: 500, // 用户代理信息
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'comments', // 指定集合名称为'comments'
  }
);

// 创建索引以提高查询性能
commentSchema.index({ questionId: 1, createdAt: -1 }); // 按题目ID和创建时间排序
commentSchema.index({ userId: 1, createdAt: -1 }); // 按用户ID和创建时间排序
commentSchema.index({ parentId: 1 }); // 用于查询回复

// 创建并导出Comment模型
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
