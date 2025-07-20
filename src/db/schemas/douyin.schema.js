import { integer, jsonb, pgTable } from 'drizzle-orm/pg-core';

export const douyinTable = pgTable('douyin', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  jsonData: jsonb('jsonData'),
});
