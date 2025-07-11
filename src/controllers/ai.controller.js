import aiReplyUtil from '../utils/ai.util.js';
import JSON5 from 'json5';
import { jsonrepair } from 'jsonrepair';

export const NamingController = async (req, res) => {
  const { surname, gender, style, meanings, avoid, species } = req.body;

  const generatePrompt = `
- 姓氏：${surname || ''}
- 性别：${gender}
- 起名风格：${style || '不限'}
- 参考寓意或关键字：${meanings || '不限'}
- 避免使用的字：${avoid || '无'}
- 物种：${species || '人类'}
`;

  const AI_PROMPT = `你是一个专业的中文起名大师。请根据以下信息生成 1 个适合的名字，并附上每个名字的解释和寓意分析，如果物种不为人类，可以忽略姓氏。返回json格式：
  {
    "name":"名字",
    "answers":"解释",
    "meaning":"寓意分析"
  }
  `;

  const message = [
    {
      content: generatePrompt,
      role: 'user',
    },
  ];
  const reply = await aiReplyUtil(message, AI_PROMPT);

  const aiName = parseMessyJson(reply);

  res.send({
    code: 2000,
    msg: 'success',
    data: {
      ...aiName,
    },
  });
};

export function parseMessyJson(input) {
  let str = String(input);

  // 1. 去除 Markdown ```json ``` 包裹
  str = str.replace(/```json|```/gi, '');

  // 2. 去除 `' +` 拼接、转义换行、收尾引号等
  str = str
    .replace(/'\s*\+\s*'/g, '') // JS 拼接符号
    .replace(/^['"`]|['"`]$/g, '') // 开头或结尾的引号
    .replace(/\\n/g, '\n') // \n 变换行
    .replace(/\\t/g, '\t') // \t 变制表
    .trim();

  // 3. 提取 JSON 主体
  const braceIndex = str.search(/[\{\[]/);
  if (braceIndex > 0) str = str.slice(braceIndex);

  // 4. 尝试解析方式（JSON > JSON5 > repair+JSON > repair+JSON5）
  try {
    return JSON.parse(str);
  } catch (_) {}

  try {
    return JSON5.parse(str);
  } catch (_) {}

  try {
    const fixed = jsonrepair(str);
    return JSON.parse(fixed);
  } catch (_) {}

  try {
    const fixed = jsonrepair(str);
    return JSON5.parse(fixed);
  } catch (err) {
    throw new Error(`无法解析为 JSON：${err.message}`);
  }
}
