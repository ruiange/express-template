import { db } from '../config/db.js';
import { wealthTable } from '../db/schema/wealth.schema.js';
import { sql } from 'drizzle-orm';


export const addMuyuWealth = async (openid, muyu) => {
  await db
    .insert(wealthTable)
    .values({
      openid,
      count: muyu,  // 初始值会是 0 - 0 + muyu = muyu
      muyu,
    })
    .onConflictDoUpdate({
      target: wealthTable.openid,
      set: {
        count: sql`${wealthTable.count} - ${wealthTable.muyu} + ${muyu}`,
        muyu: muyu,
      },
    })
    .execute();
};