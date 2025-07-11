import { db } from '../config/db.js';
import { wealthTable } from '../db/schema/wealth.schema.js';
import { desc, eq, sql } from 'drizzle-orm';

/**
 * 更新或插入用户的木鱼财富记录
 * @param {string} openid
 * @param {number} newMuyu
 */
export const addMuyuWealth = async (openid, newMuyu) => {
  const [row] = await db
    .insert(wealthTable)
    .values({
      openid,
      count: newMuyu,
      muyu: newMuyu,
    })
    .onConflictDoUpdate({
      target: wealthTable.openid,
      set: {
        count: sql.raw(`wealth.count - wealth.muyu + excluded.muyu`),
        muyu: sql.raw(`excluded.muyu`),
      },
    })
    .returning();

  return row;
};

/**
 * 查询某个用户的 count 排名（count 越大排名越高）
 * 效率高，无窗口函数，兼容性强
 * @returns 排名（从 1 开始），如果用户不存在返回 null
 */
export const getWealthRank = async (openid) => {
  // 第一步：取用户自己的 count 值
  const [user] = await db
    .select({ count: wealthTable.count })
    .from(wealthTable)
    .where(eq(wealthTable.openid, openid))
    .limit(1);

  if (!user) return null; // 用户不存在

  const userCount = user.count;

  // 第二步：统计比他大的总数（即排名 = 大于的人数 + 1）
  const [row] = await db
    .select({ total: sql`count(*)` })
    .from(wealthTable)
    .where(sql`${wealthTable.count} > ${userCount}`);

  return Number(row.total) + 1;
};

/**
 * 获取摸鱼排行榜（前20名），附带用户昵称和头像
 */
export const getMoyuRank = async () => {
  const result = await db.execute(sql`
      SELECT
          w.openid,
          w.count,
          w.muyu,
          u.nickname,
          u.avatar
      FROM wealth AS w
               LEFT JOIN users AS u ON w.openid = u.openid
      ORDER BY w.muyu DESC
          LIMIT 20
  `);

  return result.rows.map((item, index) => ({
    rank: index + 1,
    ...item,
  }));
};
