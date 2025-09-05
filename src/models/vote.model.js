import mongoose from 'mongoose';

// 用户对题目进行“会/不会”投票
// value: 1 表示会，0 表示不会
const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
      index: true,
    },
    value: {
      type: Number,
      enum: [0, 1],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'votes',
  }
);

// 限制同一用户对同一题目只能有一条投票记录
voteSchema.index({ user: 1, question: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;


