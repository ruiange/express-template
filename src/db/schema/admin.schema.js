import { pgTable, varchar, jsonb, timestamp, boolean } from 'drizzle-orm/pg-core';

export const configTable = pgTable('config', {
  key: varchar('key', { length: 100 }).primaryKey(),
  auditConfig: boolean('auditConfig').default(false),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
