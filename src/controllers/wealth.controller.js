import { addMuyuWealth, getMoyuRank, getWealthRank } from '../services/wealth.service.js';

/**
 * 通过敲木鱼增加财富
 * @param req
 * @param res
 */
export const muyuAddWealth = async (req, res) => {
  const user = req.user;

  const params = {
    openid: req.user.openid,
    muyu: req.body.totalCount,
  };

  const data = await addMuyuWealth(params.openid, params.muyu);
  const rank = await getWealthRank(params.openid);
  const result = {
    rank,
  };
  return res.send({
    code: 2000,
    msg: 'success',
    data: result,
  });
};

export const muyuRankList = async (req, res) => {
  const rank = await getMoyuRank();
  return res.send({
    code: 2000,
    msg: 'success',
    data: rank,
  });
};
