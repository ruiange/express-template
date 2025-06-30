import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

/**
 * 新闻表
 */
export const newsTable = pgTable('jiuyin_news', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  news_id: integer('news_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: varchar('content'),
  type: varchar('type', { length: 255 }),
  url: varchar('url'),
  time: varchar('time'),
});
