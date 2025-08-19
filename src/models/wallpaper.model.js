import mongoose from 'mongoose';

// 分类模型
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'wallpapers_categories'
  }
);

// 壁纸模型
const wallpaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 255
    },
    description: {
      type: String
    },
    filePath: {
      type: String,
      required: true,
      maxLength: 512
    },
    thumbnailPath: {
      type: String,
      maxLength: 512
    },
    fileKey: {
      type: String,
      maxLength: 512
    },
    fileSize: {
      type: Number
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    fileType: {
      type: String,
      maxLength: 50
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    isPublic: {
      type: Boolean,
      default: true,
      required: true
    },
    viewCount: {
      type: Number,
      default: 0
    },
    downloadCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: false, // 使用自定义的 uploadDate
    collection: 'wallpapers'
  }
);

const Category = mongoose.model('Category', categorySchema);
const Wallpaper = mongoose.model('Wallpaper', wallpaperSchema);

export { Category, Wallpaper };
export default Wallpaper;
