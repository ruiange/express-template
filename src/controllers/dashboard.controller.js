// dashboard.controller.js
import { getUserStatistics } from '../services/dashboard.service.js';

class DashboardController {
  static async getStatic(req,res){
    const data = await getUserStatistics()
    res.success(data)
  }
}
export default DashboardController