# 使用官方 Node.js 镜像
FROM node:24.11.1-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖（包括开发依赖，用于生成API文档）
RUN pnpm install

# 复制应用源代码
COPY . .

# 生成 API 文档
RUN npm run doc

# 清理开发依赖，只保留生产依赖
RUN pnpm install --prod && \
    pnpm store prune

# 创建非 root 用户运行应用（安全最佳实践）
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# 更改文件所有权
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["npm", "start"]