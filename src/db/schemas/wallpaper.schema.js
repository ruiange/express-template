import { pgTable, varchar, integer, timestamp, text, serial, boolean } from 'drizzle-orm/pg-core';

// 壁纸表
export const wallpapers = pgTable('wallpapers', {
  id: serial('id').primaryKey(), // 自增主键
  title: varchar('title', { length: 255 }), // 壁纸标题
  description: text('description'), // 壁纸描述
  filePath: varchar('file_path', { length: 512 }).notNull(), // 文件存储路径
  thumbnailPath: varchar('thumbnail_path', { length: 512 }), // 缩略图路径
  fileKey: varchar('file_key', { length: 512 }), // 存储文件的key
  fileSize: integer('file_size'), // 文件大小(字节)
  width: integer('width'), // 图片宽度(像素)
  height: integer('height'), // 图片高度(像素)
  fileType: varchar('file_type', { length: 50 }), // 文件类型(jpg, png等)
  uploadDate: timestamp('upload_date').defaultNow(), // 上传时间
  categoryId: integer('category_id').references(() => categories.id), // 分类ID(外键)
  isPublic: boolean('is_public').default(true).notNull(), // 是否公开
  viewCount: integer('view_count').default(0), // 浏览次数
  downloadCount: integer('download_count').default(0), // 下载次数

});

// 分类表
export const categories = pgTable('wallpapers_categories', {
  id: serial('id').primaryKey(), // 自增主键
  name: varchar('name', { length: 100 }).notNull(), // 分类名称
  description: text('description'), // 分类描述
  createdAt: timestamp('created_at').defaultNow().notNull(), // 创建时间
});
