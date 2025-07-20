import { pgTable, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core';

/**
 * 可以根据需求定义 images 表的字段
 * 示例字段结构：
 * - id: 主键，自增整数
 * - name: 名称，非空
 * - createdAt: 创建时间，默认当前时间
 */
export const imagesTable = pgTable('images', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
  // 在此添加更多字段...
});
