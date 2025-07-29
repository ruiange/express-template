import { pgTable, varchar, integer, timestamp, text, boolean } from 'drizzle-orm/pg-core';

/**
 * 文件资源管理表
 * 用于跟踪所有上传的文件资源，管理文件生命周期
 */
export const fileResourcesTable = pgTable('file_resources', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  // 文件基本信息
  fileName: varchar('file_name', { length: 255 }).notNull(), // 原始文件名
  fileUrl: varchar('file_url', { length: 500 }).notNull(), // 文件访问URL
  fileKey: varchar('file_key', { length: 500 }), // 存储服务的key（如R2的key）
  fileSize: integer('file_size'), // 文件大小（字节）
  mimeType: varchar('mime_type', { length: 100 }), // 文件类型
  
  // 存储信息
  storageProvider: varchar('storage_provider', { length: 50 }).notNull(), // 存储提供商：vercel, qiniu, r2
  storagePath: varchar('storage_path', { length: 500 }), // 存储路径
  
  // 状态管理
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, active, unused, deleted
  
  // 清理管理
  canDelete: boolean('can_delete').default(true), // 是否可以删除
  
  // 时间戳
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});