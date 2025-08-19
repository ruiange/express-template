import mongoose from 'mongoose';

const configSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      maxLength: 100
    },
    auditConfig: {
      type: Boolean,
      default: false
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false, // 手动管理 updatedAt
    collection: 'config'
  }
);

// 在保存前更新 updatedAt
configSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

configSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Config = mongoose.model('Config', configSchema);
export default Config;
