import { pgTable, varchar, integer, numeric } from 'drizzle-orm/pg-core';

export const wealthTable = pgTable('wealth', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  openid: varchar('openid', { length: 255 }).notNull().unique(),

  // 支持最大 20 位数字，小数位最多保留 6 位（可根据需求调整）
  count: numeric('count', { precision: 20, scale: 2 }).notNull().default('0'),
  muyu: numeric('muyu', { precision: 20, scale: 2 }).notNull().default('0'),
});
