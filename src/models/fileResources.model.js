import mongoose from 'mongoose';

const fileResourcesSchema = new mongoose.Schema(
  {
    // 文件基本信息
    fileName: {
      type: String,
      required: true,
      maxLength: 255
    },
    fileUrl: {
      type: String,
      required: true,
      maxLength: 500
    },
    fileKey: {
      type: String,
      maxLength: 500
    },
    fileSize: {
      type: Number
    },
    mimeType: {
      type: String,
      maxLength: 100
    },
    
    // 存储信息
    storageProvider: {
      type: String,
      required: true,
      maxLength: 50,
      enum: ['vercel', 'qiniu', 'r2'] // 存储提供商限制
    },
    storagePath: {
      type: String,
      maxLength: 500
    },
    
    // 状态管理
    status: {
      type: String,
      required: true,
      maxLength: 20,
      default: 'pending',
      enum: ['pending', 'active', 'unused', 'deleted']
    },
    
    // 清理管理
    canDelete: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'file_resources'
  }
);

const FileResources = mongoose.model('FileResources', fileResourcesSchema);
export default FileResources;

