import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const logsTable = pgTable('logs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  method: varchar('method', { length: 10 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  status_code: integer('status_code').notNull(),
  ip: varchar('ip', { length: 45 }).notNull(),
  user_agent: varchar('user_agent', { length: 255 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
