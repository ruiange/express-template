import mongoose from 'mongoose';
import Vote from '../models/vote.model.js';
import Question from '../models/question.model.js';

export const upsertVote = async ({ userId, questionId, value }) => {
  if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(questionId)) {
    throw new Error('参数不合法');
  }
  if (![0, 1].includes(value)) {
    throw new Error('投票值必须为0或1');
  }

  const question = await Question.findById(questionId).select('_id');
  if (!question) {
    throw new Error('题目不存在');
  }

  const vote = await Vote.findOneAndUpdate(
    { user: userId, question: questionId },
    { $set: { value } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return vote;
};

export const getMyVote = async ({ userId, questionId }) => {
  if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(questionId)) {
    throw new Error('参数不合法');
  }
  return Vote.findOne({ user: userId, question: questionId }).lean();
};

export const getVoteStats = async ({ questionId }) => {
  if (!mongoose.isValidObjectId(questionId)) {
    throw new Error('参数不合法');
  }
  const [stats] = await Vote.aggregate([
    { $match: { question: new mongoose.Types.ObjectId(questionId) } },
    {
      $group: {
        _id: '$question',
        yes: { $sum: { $cond: [{ $eq: ['$value', 1] }, 1, 0] } },
        no: { $sum: { $cond: [{ $eq: ['$value', 0] }, 1, 0] } },
        total: { $sum: 1 },
      },
    },
  ]);

  return stats || { yes: 0, no: 0, total: 0 };
};


