import 'dotenv/config';
/**
 * 将整个项目（脚本所在目录）递归上传到 FTP
 * ------------------------------------------
 */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Client } from 'basic-ftp';

/* ========= 1. FTP 连接信息 ========= */
const FTP_CONFIG = {
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  secure: process.env.FTP_SECURE, // 如需 FTPS 改成 true
};

console.log(FTP_CONFIG,'ftp连接信息')

/* ========= 2. 上传范围与排除 ========= */
// ① 本地根目录：整个项目目录（脚本所在目录）
const LOCAL_ROOT_DIR = process.cwd(); // 或 path.resolve('.')

// ② 远程根目录：项目在服务器上的目标目录
const REMOTE_ROOT_DIR = '/';

// ③ 排除列表：根据需要调整
const EXCLUDE_LIST = [
  '.idea',
  '.trae',
  'build',
  'doc',
  '.git',
  '.vscode',
  'dist',
  'node_modules',
  '.DS_Store',
  'npm-debug.log',
  'yarn.lock',
  'package-lock.json',
  'vercel.json',
  'README.md',
  '.prettierrc',
  '.env',
  '.gitignore'
];

/* ========= 3. 工具函数 ========= */
function shouldExclude(relativePath) {
  const unixPath = relativePath.split(path.sep).join('/');
  return EXCLUDE_LIST.some(
    (ex) => unixPath === ex || unixPath.startsWith(`${ex}/`)
  );
}

async function uploadDirectory(client, localDir, remoteDir, baseDir) {
  const entries = fs.readdirSync(localDir);
  for (const name of entries) {
    const localPath = path.join(localDir, name);
    const relativePath = path.relative(baseDir, localPath);

    if (shouldExclude(relativePath)) {
      console.log(chalk.gray(`⏩ 已排除: ${relativePath}`));
      continue;
    }

    const remotePath = `${remoteDir}/${name}`;
    const stats = fs.statSync(localPath);

    if (stats.isDirectory()) {
      console.log(chalk.yellow(`📁 创建远程目录: ${remotePath}`));
      await client.ensureDir(remotePath);
      await uploadDirectory(client, localPath, remotePath, baseDir);
      await client.cd('..');
    } else {
      console.log(chalk.blue(`📤 上传文件: ${relativePath} → ${remotePath}`));
      await client.uploadFrom(localPath, remotePath);
    }
  }
}

/* ========= 4. 主流程 ========= */
async function main() {
  const client = new Client();
  try {
    console.log(chalk.black.bgGreen('连接 FTP...'));
    await client.access(FTP_CONFIG);
    console.log(chalk.green('✅ 已连接'));

    await client.ensureDir(REMOTE_ROOT_DIR);

    console.log(chalk.cyan(`🚀 开始上传整个项目: ${LOCAL_ROOT_DIR}`));
    await uploadDirectory(client, LOCAL_ROOT_DIR, REMOTE_ROOT_DIR, LOCAL_ROOT_DIR);
    console.log(chalk.greenBright('🎉 项目上传完成'));
  } catch (err) {
    console.error(chalk.red(`❌ 上传失败: ${err.message}`));
  } finally {
    client.close();
    console.log(chalk.blue('FTP 连接已断开'));
  }
}

await main();
