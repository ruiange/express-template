import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import 'dotenv/config';
/**
 * id: 主键，自增整数。
 * username: 用户名，唯一。
 * password: 密码，非空。
 * email: 邮箱，唯一且非空。
 * nickname: 昵称，可为空。
 * avatar: 头像 URL，可为空。
 * membership: 会员等级，默认为 0，
 * role: 角色，默认为 'user'，可选值为 'user' 或 'admin'。
 * createdAt: 创建时间，默认为当前时间。
 * updatedAt: 更新时间，默认为当前时间。
 * createTime: 创建时间戳（秒），默认为当前时间戳。
 * openid: 微信开放平台唯一标识，唯一且可为空。
 * unionid: 微信开放平台唯一标识，唯一且可为空。
 * bio: 个人简介，可为空，最大长度为 500 字符。
 * signature: 个性签名，可为空，最大长度为 250 字符。
 * miniAppid: 小程序appid,
 * 你可以根据需求进一步调整字段长度、约束和默认值。
 */
export const userTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar('username', { length: 255 }).unique(),
  password: varchar('password', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  nickname: varchar('nickname', { length: 255 }),
  avatar: varchar('avatar', { length: 255 }),
  membership: integer('membership').default(0).notNull(),
  role: varchar('role', { length: 5 }).default('user').notNull(), // enum ['user', 'admin']
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createTime: integer('create_time')
    .default(Math.floor(Date.now() / 1000))
    .notNull(),
  openid: varchar('openid', { length: 255 }).unique(),
  unionid: varchar('unionid', { length: 255 }).unique(),
  bio: varchar('bio', { length: 500 }), // 新增个人简介字段
  signature: varchar('signature', { length: 250 }), // 新增个性签名字段
  miniAppid: varchar('appid', { length: 255 }).default(process.env.MINI_PROGRAM_APPID),
});