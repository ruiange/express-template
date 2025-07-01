import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

/**
 * id: 主键，自增整数。
 * username: 用户名，唯一且非空。
 * password: 密码，非空。
 * email: 邮箱，唯一且非空。
 * nickname: 昵称，可为空。
 * avatar: 头像 URL，可为空。
 * role: 角色，默认为 'user'，可选值为 'user' 或 'admin'。
 * createdAt: 创建时间，默认为当前时间。
 * updatedAt: 更新时间，默认为当前时间。
 * createTime: 创建时间戳（秒），默认为当前时间戳。
 * openid: 微信开放平台唯一标识，唯一且可为空。
 * 你可以根据需求进一步调整字段长度、约束和默认值。
 */
export const userTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar('username', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  nickname: varchar('nickname', { length: 255 }),
  avatar: varchar('avatar', { length: 255 }),
  role: varchar('role', { length: 5 }).default('user').notNull(), // enum ['user', 'admin']
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createTime: integer('create_time')
    .default(Math.floor(Date.now() / 1000))
    .notNull(),
  openid: varchar('openid', { length: 255 }).unique(),
});
