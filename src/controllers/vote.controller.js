import { upsertVote, getMyVote, getVoteStats } from '../services/vote.service.js';

export const postVote = async (req, res) => {
  try {
    const userId = req?.user?.id || req?.user?._id;
    const { questionId, value } = req.body || {};
    if (!questionId || value === undefined) {
      return res.error('缺少必要参数');
    }
    const vote = await upsertVote({ userId, questionId, value: Number(value) });
    console.log('vote', vote);
    return res.success(vote);
  } catch (error) {
    return res.error(error.message || '投票失败');
  }
};

export const getMine = async (req, res) => {
  try {
    const userId = req?.user?.id || req?.user?._id;
    const { questionId } = req.params;
    const vote = await getMyVote({ userId, questionId });
    return res.ok(vote || {});
  } catch (error) {
    return res.error(error.message || '查询失败');
  }
};

export const getStats = async (req, res) => {
  try {
    const { questionId } = req.params;
    const stats = await getVoteStats({ questionId });
    const userId = req?.user?.id || req?.user?._id;
    const myVote = await getMyVote({ userId, questionId });
    return res.success({ ...stats, myVoted: !!myVote, myValue: myVote?.value });
  } catch (error) {
    return res.error(error.message || '统计失败');
  }
};


