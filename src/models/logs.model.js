import mongoose from 'mongoose';

const logsSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
      maxLength: 10
    },
    url: {
      type: String,
      required: true,
      maxLength: 255
    },
    status_code: {
      type: Number,
      required: true
    },
    ip: {
      type: String,
      required: true,
      maxLength: 45
    },
    user_agent: {
      type: String,
      maxLength: 255
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false, // 使用自定义的 created_at
    collection: 'logs'
  }
);

const Logs = mongoose.model('Logs', logsSchema);
export default Logs;

