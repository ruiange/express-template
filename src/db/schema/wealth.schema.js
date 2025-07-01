import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const wealthTable = pgTable('wealth', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  openid: varchar('openid', { length: 255 }).notNull(),
  count: integer('count').notNull().default(0),
  muyu: integer('muyu').notNull().default(0),
});
