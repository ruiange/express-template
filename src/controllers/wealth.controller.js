import { addMuyuWealth } from '../services/wealth.service.js';

/**
 * 通过敲木鱼增加财富
 * @param req
 * @param res
 */
export const muyuAddWealth = async (req, res) => {
  const user = req.user;
  console.log(req.body, req.user);

  const params = {
    openid: req.body.openid,
    muyu: req.body.totalCount,
  };

  await addMuyuWealth(params.openid, params.muyu)

  return res.send({
    code: 2000,
    msg: 'success',
    data: {
      user: user,
    },
  });
};
