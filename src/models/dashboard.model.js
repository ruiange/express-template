import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 255
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'dashboards'
  }
);

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
export default Dashboard;

