import { getAuditConfigByKey, updateAuditConfigByKey } from '../services/admin.service.js';
import * as tty from 'node:tty';

export const auditConfigController = async (req, res) => {
  let status = false;

  try {
    status = req.body.status;
  } catch (e) {
    console.log(e.message);
  }

  const result = await updateAuditConfigByKey(status);

  console.log(result);
  delete result.key
  return res.send({
    code: 2000,
    data:result,
    message: '更新成功',
  });
};


export const getAuditConfigController = async (req, res) => {
  const result = await getAuditConfigByKey();
  return res.send({
    code: 2000,
    data:result,
    message: '更新成功',
  });
};