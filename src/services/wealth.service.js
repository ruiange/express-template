import Wealth from '../models/wealth.model.js';
import User from '../models/user.model.js';

/**
 * 更新或插入用户的木鱼财富记录
 * @param {string} openid
 * @param {number} newMuyu
 */
export const addMuyuWealth = async (openid, newMuyu) => {
  try {
    const existingWealth = await Wealth.findOne({ openid });

    if (existingWealth) {
      // 更新现有记录
      const oldMuyu = parseFloat(existingWealth.muyu) || 0;
      const oldCount = parseFloat(existingWealth.count) || 0;

      existingWealth.count = oldCount - oldMuyu + newMuyu;
      existingWealth.muyu = newMuyu;

      await existingWealth.save();
      return existingWealth;
    } else {
      // 创建新记录
      const newWealth = new Wealth({
        openid,
        count: newMuyu,
        muyu: newMuyu,
      });

      await newWealth.save();
      return newWealth;
    }
  } catch (error) {
    console.error('Error in addMuyuWealth:', error);
    throw error;
  }
};

/**
 * 查询某个用户的 count 排名（count 越大排名越高）
 * 效率高，无窗口函数，兼容性强
 * @returns 排名（从 1 开始），如果用户不存在返回 null
 */
export const getWealthRank = async (openid) => {
  try {
    // 第一步：取用户自己的 count 值
    const user = await Wealth.findOne({ openid });

    if (!user) return null; // 用户不存在

    const userCount = parseFloat(user.count) || 0;

    // 第二步：统计比他大的总数（即排名 = 大于的人数 + 1）
    const greaterCount = await Wealth.countDocuments({
      count: { $gt: userCount },
    });

    return greaterCount + 1;
  } catch (error) {
    console.error('Error in getWealthRank:', error);
    return null;
  }
};

/**
 * 获取摸鱼排行榜（前20名），附带用户昵称和头像
 */
export const getMoyuRank = async () => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: 'users',
          localField: 'openid',
          foreignField: 'openid',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: { muyu: -1 },
      },
      {
        $limit: 20,
      },
      {
        $project: {
          openid: 1,
          count: 1,
          muyu: 1,
          nickname: '$user.nickname',
          avatar: '$user.avatar',
        },
      },
    ];

    const results = await Wealth.aggregate(pipeline);

    return results.map((item, index) => ({
      rank: index + 1,
      openid: item.openid,
      count: parseFloat(item.count) || 0,
      muyu: parseFloat(item.muyu) || 0,
      nickname: item.nickname,
      avatar: item.avatar,
    }));
  } catch (error) {
    console.error('Error in getMoyuRank:', error);
    return [];
  }
};
