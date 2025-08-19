import Config from '../models/admin.model.js';

export const updateAuditConfigByKey = async (auditConfigValue) => {
  const key = process.env.MINI_PROGRAM_APPID;
  try {
    const result = await Config.findOneAndUpdate(
      { key },
      { auditConfig: auditConfigValue, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    return result;
  } catch (error) {
    console.error('Error updating audit config:', error);
    return false;
  }
};

export const getAuditConfigByKey = async () => {
  const key = process.env.MINI_PROGRAM_APPID;
  try {
    const result = await Config.findOne({ key });
    return result;
  } catch (error) {
    console.error('Error getting audit config:', error);
    return false;
  }
};