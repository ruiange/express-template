import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      maxLength: 255,
      sparse: true // 允许多个null值，但确保非null值唯一
    },
    password: {
      type: String,
      maxLength: 255
    },
    email: {
      type: String,
      unique: true,
      maxLength: 255,
      sparse: true // 允许多个null值，但确保非null值唯一
    },
    nickname: {
      type: String,
      maxLength: 255
    },
    avatar: {
      type: String,
      maxLength: 255
    },
    membership: {
      type: Number,
      default: 0,
      required: true
    },
    role: {
      type: String,
      maxLength: 5,
      default: 'user',
      required: true,
      enum: ['user', 'admin']
    },
    createTime: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000),
      required: true
    },
    openid: {
      type: String,
      unique: true,
      maxLength: 255,
      sparse: true // 允许多个null值，但确保非null值唯一
    },
    unionid: {
      type: String,
      unique: true,
      maxLength: 255,
      sparse: true // 允许多个null值，但确保非null值唯一
    },
    bio: {
      type: String,
      maxLength: 500
    },
    signature: {
      type: String,
      maxLength: 250
    },
    miniAppid: {
      type: String,
      maxLength: 255,
      default: process.env.MINI_PROGRAM_APPID
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'users'
  }
);

const User = mongoose.model('User', userSchema);
export default User;

