// create-module.js

import fs from 'fs';
import path from 'path';
import readline from 'readline';

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 定义目标目录映射
const targetDirs = {
  controller: path.join('src', 'controllers'),
  route: path.join('src', 'routes'),
  service: path.join('src', 'services'),
  schema: path.join('src', 'db', 'schemas') // admin.schema.js 放在这里
};

// 文件模板内容（ESM 风格）
const templates = {
  controller: (name) => `// ${name}.controller.js

import ${name}Service from '../services/${name}.service.js';

export async function get${capitalizeFirstLetter(name)}s(req, res) {
  try {
    const data = await ${name}Service.get${capitalizeFirstLetter(name)}s();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 可以继续添加其他方法如 getById, create, update, delete 等
`,

  schema: (name) => `// ${name}.schema.js

import mongoose from 'mongoose';

const ${name}Schema = new mongoose.Schema({
  // 在这里定义你的字段
  name: {
    type: String,
    required: true
  },
  // 添加更多字段...
});

const ${name}Model = mongoose.model('${name}', ${name}Schema);
export default ${name}Model;
`,

  route: (name) => `// ${name}.route.js

import express from 'express';
import ${name}Controller from '../controllers/${name}.controller.js';

const router = express.Router();

router.get('/', ${name}Controller.get${capitalizeFirstLetter(name)}s);
// 添加更多路由如 getById, create, update, delete 等

export default router;
`,

  service: (name) => `// ${name}.service.js

import ${name}Model from '../db/schemas/${name}.schema.js'; // 注意路径调整

export async function get${capitalizeFirstLetter(name)}s() {
  return await ${name}Model.find();
}

// 可以继续添加其他方法如 getById, create, update, delete 等
`
};

// 辅助函数：首字母大写
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 询问用户输入模块名称
rl.question('请输入模块名称（如 admin）：', async (moduleName) => {
  moduleName = moduleName.trim().toLowerCase();

  if (!moduleName) {
    console.log('模块名称不能为空！');
    rl.close();
    return;
  }

  // 要创建的文件列表及其目标目录
  const filesToCreate = [
    { type: 'controller', name: `${moduleName}.controller.js`, content: templates.controller(moduleName) },
    { type: 'schema', name: `${moduleName}.schema.js`, content: templates.schema(moduleName) },
    { type: 'route', name: `${moduleName}.route.js`, content: templates.route(moduleName) },
    { type: 'service', name: `${moduleName}.service.js`, content: templates.service(moduleName) }
  ];

  // 目标根目录（假设当前目录是项目的根目录）
  const targetRootDir = process.cwd();

  let createdCount = 0;

  // 遍历并创建文件
  for (const { type, name, content } of filesToCreate) {
    const targetDir = path.join(targetRootDir, targetDirs[type]);
    const filePath = path.join(targetDir, name);

    // 确保目标目录存在
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true }); // 递归创建目录
      console.log(`已创建目录：${targetDir}`);
    }

    if (fs.existsSync(filePath)) {
      console.log(`文件已存在，跳过创建：${name}`);
    } else {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`已创建文件：${filePath}`);
      createdCount++;
    }
  }

  console.log(`✅ 共创建了 ${createdCount} 个文件。`);

  rl.close();
});