# Wallpaper API 文档

基于 `wallpaper.schema.js` 开发的完整壁纸管理系统 API。

## 数据库结构

### 壁纸表 (wallpapers)
- `id`: 自增主键
- `title`: 壁纸标题 (必填)
- `description`: 壁纸描述
- `filePath`: 文件存储路径 (必填)
- `thumbnailPath`: 缩略图路径 (必填)
- `fileSize`: 文件大小(字节)
- `width`: 图片宽度(像素)
- `height`: 图片高度(像素)
- `fileType`: 文件类型 (必填)
- `uploadDate`: 上传时间 (自动生成)
- `categoryId`: 分类ID (外键)
- `isPublic`: 是否公开 (默认 true)
- `viewCount`: 浏览次数 (默认 0)
- `downloadCount`: 下载次数 (默认 0)

### 分类表 (wallpapers_categories)
- `id`: 自增主键
- `name`: 分类名称 (必填)
- `description`: 分类描述
- `createdAt`: 创建时间 (自动生成)

## API 端点

### 壁纸相关 API

#### 1. 创建壁纸
```http
POST /api/wallpaper
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "美丽风景",
  "description": "一张美丽的风景壁纸",
  "filePath": "/uploads/wallpapers/beautiful-landscape.jpg",
  "thumbnailPath": "/uploads/thumbnails/beautiful-landscape-thumb.jpg",
  "fileSize": 2048576,
  "width": 1920,
  "height": 1080,
  "fileType": "jpg",
  "categoryId": 1,
  "isPublic": true
}
```

#### 2. 获取壁纸列表
```http
GET /api/wallpaper?current=1&pageSize=10&search=风景&categoryId=1&isPublic=true&sortBy=uploadDate&sortOrder=desc
```

查询参数：
- `current`: 当前页码 (默认: 1)
- `pageSize`: 每页数量 (默认: 10)
- `search`: 搜索关键词
- `categoryId`: 分类ID
- `isPublic`: 是否公开 (默认: true)
- `sortBy`: 排序字段 (uploadDate, viewCount, downloadCount)
- `sortOrder`: 排序方向 (asc, desc)

#### 3. 获取壁纸详情
```http
GET /api/wallpaper/1
```

#### 4. 更新壁纸
```http
PUT /api/wallpaper/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "更新后的标题",
  "description": "更新后的描述",
  "isPublic": false
}
```

#### 5. 删除壁纸
```http
DELETE /api/wallpaper/1
Authorization: Bearer <token>
```

#### 6. 下载壁纸
```http
POST /api/wallpaper/1/download
```

#### 7. 获取热门壁纸
```http
GET /api/wallpaper/popular?limit=10
```

#### 8. 获取最新壁纸
```http
GET /api/wallpaper/latest?limit=10
```

### 分类相关 API

#### 1. 创建分类
```http
POST /api/wallpaper/category
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "风景",
  "description": "风景类壁纸"
}
```

#### 2. 获取所有分类
```http
GET /api/wallpaper/category
```

#### 3. 获取分类详情
```http
GET /api/wallpaper/category/1
```

#### 4. 更新分类
```http
PUT /api/wallpaper/category/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "自然风景",
  "description": "自然风景类壁纸"
}
```

#### 5. 删除分类
```http
DELETE /api/wallpaper/category/1
Authorization: Bearer <token>
```

注意：只有当分类下没有壁纸时才能删除。

## 响应格式

### 成功响应
```json
{
  "code": 2000,
  "message": "操作成功",
  "data": {
    // 具体数据
  }
}
```

### 错误响应
```json
{
  "code": 4000,
  "message": "错误信息"
}
```

## 状态码说明

- `2000`: 成功
- `4000`: 请求参数错误
- `4004`: 资源不存在
- `5000`: 服务器内部错误

## 权限说明

- 创建、更新、删除壁纸需要认证
- 创建、更新、删除分类需要认证
- 查看壁纸列表、详情、下载等操作无需认证

## 文件结构

```
src/
├── controllers/
│   └── wallpaper.controller.js    # 壁纸控制器
├── services/
│   └── wallpaper.service.js       # 壁纸服务层
├── routes/
│   └── modules/
│       └── wallpaper.route.js     # 壁纸路由
└── db/
    └── schemas/
        └── wallpaper.schema.js    # 壁纸数据库模式
```

## 使用示例

### 前端调用示例

```javascript
// 获取壁纸列表
const getWallpapers = async () => {
  const response = await fetch('/api/wallpaper?current=1&pageSize=10');
  const data = await response.json();
  return data;
};

// 创建壁纸
const createWallpaper = async (wallpaperData) => {
  const response = await fetch('/api/wallpaper', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(wallpaperData)
  });
  const data = await response.json();
  return data;
};

// 下载壁纸
const downloadWallpaper = async (id) => {
  const response = await fetch(`/api/wallpaper/${id}/download`, {
    method: 'POST'
  });
  const data = await response.json();
  return data;
};
```

## 注意事项

1. 文件上传需要配合现有的上传服务使用
2. 确保数据库连接正常
3. 认证中间件需要正确配置
4. 建议在生产环境中添加更多的验证和错误处理