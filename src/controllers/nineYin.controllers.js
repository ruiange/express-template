import { scanNewsService } from '../services/nineYin.service.js';

export const scanNewsController = async (req, res) => {
  const page = req.query.page || 0;
  const newList = await scanNewsService(Number(page));
  res.send({
    code: 2000,
    msg: page,
    data: newList,
  });
};
