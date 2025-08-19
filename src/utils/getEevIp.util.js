import os from 'os';

/**
 * 获取当前环境的IPv4地址
 * 遍历所有网络接口，返回第一个非内部的IPv4地址
 * 如果没有找到合适的地址，则返回'0.0.0.0'
 */
const getEevIp = () => {
  // 获取所有网络接口
  const interfaces = os.networkInterfaces();
  // 遍历每个网络接口
  for (const name of Object.keys(interfaces)) {
    // 遍历每个接口的地址信息
    for (const iface of interfaces[name]) {
      // 检查是否为IPv4地址且不是内部地址
      if (iface.family === 'IPv4' && !iface.internal) {
        // 返回找到的IPv4地址
        return iface.address;
      }
    }
  }
  // 如果没有找到合适的地址，返回默认地址'0.0.0.0'
  return '0.0.0.0';
};

export default getEevIp;
