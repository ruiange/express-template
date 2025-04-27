import { scanNewsService } from '../services/nineYinService.js';

export const scanNewsController = async (req, res) => {

  const newList = await scanNewsService();
  res.send({
    code: 2000,
    data: newList,
    msg: 'success',
  });
};
