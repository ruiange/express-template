# 文件资源管理系统使用指南

## 概述

文件资源管理系统用于跟踪和管理上传的文件资源，自动清理未被业务使用的文件，避免存储空间浪费。

## 核心功能

1. **文件资源跟踪** - 自动记录所有上传的文件
2. **使用状态管理** - 标记文件的使用状态
3. **自动清理** - 定期清理未使用的文件
4. **统计报告** - 提供文件使用统计信息

## 数据库表结构

### fileResourcesTable
- `id` - 主键
- `fileName` - 文件名
- `fileUrl` - 文件URL
- `storageProvider` - 存储提供商 (vercel/qiniu/r2)
- `status` - 状态 (unused/active/deleted)
- `createdAt` - 创建时间
- `updatedAt` - 更新时间



## API 接口

### 1. 获取文件统计信息
```http
GET /api/file-cleanup/stats
```

响应示例：
```json
{
  "success": true,
  "data": {
    "total": 1000,
    "used": 800,
    "unused": 150,
    "deleted": 50,
    "byProvider": {
      "vercel": 400,
      "qiniu": 300,
      "r2": 300
    }
  }
}
```

### 2. 获取待清理文件列表
```http
GET /api/file-cleanup/list?limit=50
```

### 3. 手动执行文件清理
```http
POST /api/file-cleanup/manual
Content-Type: application/json

{
  "batchSize": 50
}
```

### 4. 标记文件为已使用
```http
POST /api/file-cleanup/mark-used
Content-Type: application/json

{
  "fileUrl": "https://example.com/file.jpg"
}
```

### 5. 标记文件为未使用
```http
POST /api/file-cleanup/mark-unused
Content-Type: application/json

{
  "fileUrl": "https://example.com/file.jpg"
}
```

## 业务集成示例

### 1. 文件上传时自动记录

上传服务已自动集成，无需额外代码：

```javascript
// 上传文件时会自动记录到文件资源表
const result = await vercelBlobUpload(file, 'uploads');
```

### 2. 业务使用文件时标记

```javascript
import { markFileAsUsed } from '../services/fileResource.service.js';

// 当文章发布时，标记其中的图片为已使用
async function publishArticle(articleData) {
  // 发布文章逻辑
  const article = await saveArticle(articleData);
  
  // 标记文章中的图片为已使用
  if (articleData.images && articleData.images.length > 0) {
    for (const imageUrl of articleData.images) {
      await markFileAsUsed(imageUrl);
    }
  }
  
  return article;
}
```

### 3. 业务删除文件时标记

```javascript
import { markFileAsUnused } from '../services/fileResource.service.js';

// 当文章删除时，标记其中的图片为未使用
async function deleteArticle(articleId) {
  const article = await getArticleById(articleId);
  
  // 标记文章中的图片为未使用
  if (article.images && article.images.length > 0) {
    for (const imageUrl of article.images) {
      await markFileAsUnused(imageUrl);
    }
  }
  
  // 删除文章
  await removeArticle(articleId);
}
```

### 4. 批量处理现有数据

```javascript
import { markFileAsUsed } from '../services/fileResource.service.js';

// 批量标记现有文章的图片为已使用
async function markExistingArticleImages() {
  const articles = await getAllArticles();
  
  for (const article of articles) {
    if (article.images && article.images.length > 0) {
      for (const imageUrl of article.images) {
        await markFileAsUsed(imageUrl);
      }
    }
  }
}
```

## 定时清理配置

### 启动定时任务

```javascript
import fileCleanupScheduler from '../tasks/fileCleanupScheduler.js';

// 启动定时任务（每天凌晨2点执行）
fileCleanupScheduler.start();

// 自定义执行时间（每小时执行一次）
fileCleanupScheduler.start('0 * * * *');
```

### 手动触发清理

```javascript
// 手动触发一次清理
const result = await fileCleanupScheduler.triggerManual();
console.log('清理结果:', result);
```

## 最佳实践

### 1. 文件生命周期管理

1. **上传阶段** - 文件自动记录为 `unused` 状态
2. **使用阶段** - 业务确认使用时标记为 `active`
3. **清理阶段** - 定期清理 `unused` 状态的文件

### 2. 监控和告警

建议定期检查：
- 未使用文件的数量和大小
- 清理任务的执行结果
- 存储空间的使用情况

### 3. 数据备份

在执行大规模清理前，建议：
- 备份文件资源数据库
- 确认业务逻辑正确标记了文件状态
- 小批量测试清理功能

## 故障排查

### 1. 文件误删

如果文件被误删，可以通过 `fileResourcesTable` 查看文件状态：

```sql
SELECT * FROM fileResourcesTable 
WHERE status = 'deleted' 
AND updatedAt > '2024-01-01'
ORDER BY updatedAt DESC;
```

### 2. 清理任务失败

检查日志中的错误信息，常见问题：
- 存储服务认证失败
- 网络连接问题
- 文件已被删除

### 3. 性能优化

如果文件数量很大，可以：
- 调整批量清理的大小
- 增加清理任务的执行频率
- 使用数据库索引优化查询