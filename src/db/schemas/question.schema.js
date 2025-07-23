import { pgTable, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core';

/**
 * 题库表结构定义
 * - id: 主键，自增整数
 * - title: 题目标题，非空
 * - content: 题目内容，非空
 * - answer: 题目答案，非空
 * - difficulty: 难度级别（1-5），默认为3
 * - category: 题目分类，如前端、后端、算法等
 * - tags: 题目标签，如JavaScript、React、Node.js等
 * - createdAt: 创建时间，默认当前时间
 * - updatedAt: 更新时间，默认当前时间
 */
export const questionTable = pgTable('questions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  answer: text('answer').notNull(),
  difficulty: integer('difficulty').default(3).notNull(),
  category: varchar('category', { length: 100 }),
  tags: varchar('tags', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});
 