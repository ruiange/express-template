# Express API 模板项目

这是一个基于 Express.js 框架的 API 服务模板项目，集成了多个实用功能和最佳实践。

## 项目特性

- 🚀 基于 Express 5.x 构建
- 📝 集成 ApiDoc 自动生成 API 文档
- 🔒 支持 JWT 身份验证
- 📤 文件上传功能（支持七牛云存储）
- 🌍 CORS 跨域支持
- 🔄 支持热重载开发
- 📦 Vercel 部署支持

## 技术栈

- Express.js - Web 应用框架
- MongoDB (Mongoose) - 数据库
- JWT - 身份验证
- Multer - 文件上传
- ApiDoc - API 文档生成
- dotenv - 环境变量配置

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境运行

```bash
npm start
```

### 生成 API 文档

```bash
npm run apidoc
```

## 环境变量配置

在项目根目录创建 `.env` 文件 ,参考`.env.example`

## 项目结构

```
├── src/
│   ├── app.js          # 应用入口文件
│   ├── routes/         # 路由文件
│   ├── controllers/    # 控制器
│   ├── models/         # 数据模型
│   ├── middlewares/    # 中间件
│   ├── utils/          # 工具函数
│   └── public/         # 静态文件
│       └── apidoc/     # API 文档
├── .env                # 环境变量
├── .gitignore
├── package.json
├── vercel.json         # Vercel 部署配置
└── apidoc.json         # ApiDoc 配置
```

## API 文档

API 文档自动生成并部署在 `/apidoc` 路径下。本地开发时可以通过 `http://localhost:3000/apidoc` 访问。

## API 接口文档

### 题库模块接口

#### 获取题库列表

**接口地址：** `GET /api/question/list`

**查询参数：**
- `page` (可选): 页码，默认为1
- `limit` (可选): 每页数量，默认为10
- `category` (可选): 分类筛选
- `tags` (可选): 标签筛选
- `difficulty` (可选): 难度筛选
- `keyword` (可选): 关键词搜索
- `sortBy` (可选): 排序字段，默认为createdAt
- `sortOrder` (可选): 排序方式，asc或desc，默认为desc

**请求示例：**
```
GET /api/question/list?page=1&limit=10&category=前端&difficulty=3
```

**响应示例：**
```json
{
  "code": 2000,
  "message": "操作成功",
  "data": {
    "questions": [
      {
        "id": 1,
        "title": "JavaScript闭包是什么？",
        "content": "请解释JavaScript中闭包的概念及其应用场景。",
        "difficulty": 3,
        "category": "前端",
        "tags": "JavaScript,闭包",
        "createdAt": "2023-06-01T08:00:00.000Z",
        "updatedAt": "2023-06-01T08:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
}
```

#### 获取题目详情

**接口地址：** `GET /api/question/:id`

**路径参数：**
- `id`: 题目ID

**请求示例：**
```
GET /api/question/1
```

**响应示例：**
```json
{
  "code": 2000,
  "message": "操作成功",
  "data": {
    "id": 1,
    "title": "JavaScript闭包是什么？",
    "content": "请解释JavaScript中闭包的概念及其应用场景。",
    "answer": "闭包是指有权访问另一个函数作用域中变量的函数...",
    "difficulty": 3,
    "category": "前端",
    "tags": "JavaScript,闭包",
    "createdAt": "2023-06-01T08:00:00.000Z",
    "updatedAt": "2023-06-01T08:00:00.000Z"
  }
}
```

#### 创建题目

**接口地址：** `POST /api/question/create`

**请求体：**
```json
{
  "title": "JavaScript闭包是什么？",
  "content": "请解释JavaScript中闭包的概念及其应用场景。",
  "answer": "闭包是指有权访问另一个函数作用域中变量的函数...",
  "difficulty": 3,
  "category": "前端",
  "tags": "JavaScript,闭包"
}
```

**响应示例：**
```json
{
  "code": 2001,
  "message": "题目创建成功",
  "data": {
    "id": 1,
    "title": "JavaScript闭包是什么？",
    "content": "请解释JavaScript中闭包的概念及其应用场景。",
    "answer": "闭包是指有权访问另一个函数作用域中变量的函数...",
    "difficulty": 3,
    "category": "前端",
    "tags": "JavaScript,闭包",
    "createdAt": "2023-06-01T08:00:00.000Z",
    "updatedAt": "2023-06-01T08:00:00.000Z"
  }
}
```

#### 更新题目

**接口地址：** `PUT /api/question/:id`

**路径参数：**
- `id`: 题目ID

**请求体：**
```json
{
  "title": "更新后的标题",
  "content": "更新后的内容",
  "answer": "更新后的答案"
}
```

**响应示例：**
```json
{
  "code": 2000,
  "message": "题目更新成功",
  "data": {
    "id": 1,
    "title": "更新后的标题",
    "content": "更新后的内容",
    "answer": "更新后的答案",
    "difficulty": 3,
    "category": "前端",
    "tags": "JavaScript,闭包",
    "createdAt": "2023-06-01T08:00:00.000Z",
    "updatedAt": "2023-06-01T09:00:00.000Z"
  }
}
```

#### 删除题目

**接口地址：** `DELETE /api/question/:id`

**路径参数：**
- `id`: 题目ID

**请求示例：**
```
DELETE /api/question/1
```

**响应示例：**
```json
{
  "code": 2000,
  "message": "题目删除成功",
  "data": true
}
```

### 管理员接口

#### 获取用户列表

**接口地址：** `GET /api/admin/user/users`

**请求头：**
```
Authorization: Bearer <token>
```

**查询参数：**
- `page` (可选): 页码，默认为1
- `limit` (可选): 每页数量，默认为10
- `search` (可选): 搜索关键词，支持用户名、昵称、邮箱搜索

**权限要求：** 需要管理员权限

**请求示例：**
```
GET /api/admin/user/users?page=1&limit=10&search=test
```

**响应示例：**
```json
{
  "code": 2000,
  "message": "获取用户列表成功",
  "data": {
    "users": [
      {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "nickname": "测试用户",
        "avatar": "https://example.com/avatar.jpg",
        "role": "user",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "createTime": 1704067200
      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

**错误响应：**
```json
{
  "code": 4001,
  "message": "未经身份验证的用户"
}
```

```json
{
  "code": 4003,
  "message": "权限不足，需要管理员权限"
}
```

## 许可证

[ISC](LICENSE)