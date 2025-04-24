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

在项目根目录创建 `.env` 文件，配置以下环境变量：

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
QINIU_ACCESS_KEY=your_qiniu_access_key
QINIU_SECRET_KEY=your_qiniu_secret_key
QINIU_BUCKET=your_qiniu_bucket
```

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

## 部署

### Vercel 部署

项目已配置 `vercel.json`，可以直接部署到 Vercel：

1. 安装 Vercel CLI：`npm i -g vercel`
2. 运行：`vercel`

## 许可证

[ISC](LICENSE)