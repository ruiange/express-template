import { integer, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

/**
 * 请求日志表
 */
export const logsTable = pgTable('logs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  method: varchar('method', { length: 10 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  status_code: integer('status_code').notNull(),
  ip: varchar('ip', { length: 45 }).notNull(),
  user_agent: varchar('user_agent', { length: 255 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

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

/**
 * 抖音存储表
 */
export const douyinTable = pgTable('douyin', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  jsonData: jsonb('jsonData'),
});
