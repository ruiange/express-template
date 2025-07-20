// scripts/createModule.script.js

import fs from 'fs';
import path from 'path';
import readline from 'readline';

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 获取当前脚本所在的目录（ESM 兼容方式）
const scriptPath = new URL(import.meta.url).pathname;
let __dirname = scriptPath.replace(/^file:\/\/\//, '');
__dirname = __dirname.replace(/^\//, '');

// 定义目标目录映射
const targetDirs = {
  controller: path.join('src', 'controllers'),
  route: path.join('src', 'routes','modules'),
  service: path.join('src', 'services'),
  schema: path.join('src', 'db', 'schemas')
};

// ===== 模板内容 =====
const templates = {
  // 极简控制器模板
  controller: (name) => `// ${name}.controller.js\n`,

  // Drizzle ORM Schema 模板
  schema: (name) => `import { pgTable, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core';

/**
 * 可以根据需求定义 ${name} 表的字段
 * 示例字段结构：
 * - id: 主键，自增整数
 * - name: 名称，非空
 * - createdAt: 创建时间，默认当前时间
 */
export const ${name}Table = pgTable('${name}s', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
  // 在此添加更多字段...
});
`,

  // 极简路由模板
  route: (name) => `// ${name}.route.js\n\nimport express from 'express';

const ${name}Route = express.Router();

export default ${name}Route;
`,

  // 极简服务模板
  service: (name) => `// ${name}.service.js\n`
};

// 辅助函数：首字母大写
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 渲染模板
const renderTemplate = (templateFunc, name) => {
  return templateFunc(name);
};

// 加载模板函数
const loadTemplate = (templateName) => {
  if (!templates[templateName]) {
    throw new Error(`模板 ${templateName} 不存在！`);
  }
  return templates[templateName];
};

// 主流程
rl.question('请输入模块名称（如 admin）：', async (moduleName) => {
  moduleName = moduleName.trim().toLowerCase();

  if (!moduleName) {
    console.log('模块名称不能为空！');
    rl.close();
    return;
  }

  const filesToCreate = [
    { type: 'controller', name: `${moduleName}.controller.js` },
    { type: 'schema', name: `${moduleName}.schema.js` },
    { type: 'route', name: `${moduleName}.route.js` },
    { type: 'service', name: `${moduleName}.service.js` }
  ];

  const targetRootDir = process.cwd();
  let createdCount = 0;

  for (const { type, name } of filesToCreate) {
    const targetDir = path.join(targetRootDir, targetDirs[type]);
    const filePath = path.join(targetDir, name);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`已创建目录：${targetDir}`);
    }

    if (fs.existsSync(filePath)) {
      console.log(`文件已存在，跳过创建：${name}`);
    } else {
      const templateFunc = loadTemplate(type);
      const content = renderTemplate(templateFunc, moduleName);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`已创建文件：${filePath}`);
      createdCount++;
    }
  }

  console.log(`✅ 共创建了 ${createdCount} 个文件。`);
  rl.close();
});