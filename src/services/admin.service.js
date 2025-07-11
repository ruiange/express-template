import { db } from '../config/db.js';
import { eq } from 'drizzle-orm';
import { configTable } from '../db/schema/admin.schema.js';

export const updateAuditConfigByKey = async (auditConfigValue) => {
  const key = process.env.MINI_PROGRAM_APPID;
  try {
    const result = await db
      .update(configTable)
      .set({ auditConfig: auditConfigValue, updatedAt: new Date() })
      .where(eq(configTable.key, key))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Error updating audit config:', error);
    return false;
  }
};

export const getAuditConfigByKey = async () => {
  const key = process.env.MINI_PROGRAM_APPID;
  try {
    const result = await db.select().from(configTable).where(eq(configTable.key, key));
    return result[0];
  } catch (error) {
    console.error('Error getting audit config:', error);
    return false;
  }
};
