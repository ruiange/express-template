# Express API 模板项目

## PS：master分支只能合并，无法直接提交；master分支提交后 会自动部署镜像到docker

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
- Nodemon - 开发环境热重载

## Nodemon 配置

项目已配置 `nodemon.json` 文件来优化开发体验：

### 默认忽略规则
- `node_modules/` - 依赖包目录
- `src/public/` - 静态文件目录
- `*.log`, `*.tmp`, `*.temp` - 临时文件
- `build/`, `dist/`, `coverage/` - 构建和测试目录
- `.git/` - Git 版本控制目录
- `docs/`, `drizzle/` - 文档和数据库迁移文件
- `src/public/apidoc/` - API 文档生成目录

### 自定义配置

如需修改 nodemon 行为，可以编辑 `nodemon.json` 文件：

```json
{
  "watch": ["src"],          // 监听的目录
  "ext": "js,json",          // 监听的文件扩展名
  "ignore": [                 // 忽略的文件/目录
    "node_modules/**/*",
    "src/public/**/*"
  ],
  "delay": 1000,              // 重启延迟（毫秒）
  "env": {
    "NODE_ENV": "development"  // 环境变量
  }
}
```

### 常用忽略配置示例

```json
// 忽略特定文件类型
"ignore": ["*.test.js", "*.spec.js"]

// 忽略特定目录
"ignore": ["uploads/**/*", "logs/**/*"]

// 忽略数据库文件
"ignore": ["*.db", "*.sqlite"]
```

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

## Docker 部署

项目已配置 Docker 支持，可以轻松地在任何支持 Docker 的环境中部署和运行。

### Docker 配置文件

- `Dockerfile` - Docker 镜像构建配置
- `docker-compose.yml` - Docker Compose 服务编排配置
- `.dockerignore` - Docker 构建忽略文件

### 快速部署

#### 使用 Docker Compose（推荐）

```bash
# 构建并启动服务
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

#### 使用 Docker 命令

```bash
# 构建镜像
docker build -t express-template .

# 运行容器
docker run -d \
  --name express-app \
  -p 3000:3000 \
  --env-file .env \
  express-template

# 查看容器状态
docker ps

# 查看日志
docker logs -f express-app

# 停止容器
docker stop express-app
```

### 环境配置

确保 `.env` 文件包含所有必要的环境变量：

- `DATABASE_URL` - PostgreSQL 数据库连接字符串
- `REDIS_URL` - Redis 连接字符串
- `JWT_SECRET` - JWT 签名密钥
- 其他必要的配置项

### 健康检查

项目包含健康检查端点 `/api/health`，Docker 会自动监控服务状态：

```bash
# 手动检查服务健康状态
curl http://localhost:3000/api/health
```

### 生产环境部署注意事项

1. **环境变量安全**：确保生产环境的 `.env` 文件包含正确的配置
2. **数据库连接**：使用外部数据库服务（如 Neon PostgreSQL）
3. **Redis 连接**：使用外部 Redis 服务
4. **日志管理**：生产环境建议配置日志收集和监控
5. **反向代理**：建议在生产环境中使用 Nginx 等反向代理

### Docker 镜像优化

- 使用 Alpine Linux 基础镜像减小镜像体积
- 多阶段构建优化构建过程
- 非 root 用户运行提高安全性
- `.dockerignore` 文件减少构建上下文

## 许可证

[ISC](LICENSE)

[![星象历史图](https://api.star-history.com/svg?repos=ruiange/express-template&type=Date)](https://www.star-history.com/#ruiange/express-template&Date)