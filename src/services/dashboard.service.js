// dashboard.service.js
import dayjs from 'dayjs';

import { getUserCount, getUserCountByTime } from './user.service.js';

export const getUserStatistics = async () => {
  const count = await getUserCount();

  //今日
  const today = dayjs();
  //七天前
  const weekAgo = dayjs().subtract(7, 'day');
  // 14天前
  const twoWeekAgo = dayjs().subtract(14, 'day');

  const inThePastWeek_count = await getUserCountByTime(weekAgo, today);
  const inThePastTwoWeeks_count = await getUserCountByTime(twoWeekAgo, weekAgo);
  // 计算本周比上周 趋势百分比
  const currentWeekCount = inThePastWeek_count[0].count;
  console.log(currentWeekCount, '本周数量');
  const previousWeekCount = inThePastTwoWeeks_count[0].count;
  console.log(previousWeekCount, '上周数量');
  // 计算趋势百分比
  const upTrend =
    previousWeekCount === 0
      ? currentWeekCount === 0
        ? 0
        : 100 // 如果上周为0，本周为0则0%，否则100%
      : ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;

  return {
    number: count[0].count,
    currentWeekCount,
    previousWeekCount,
    upTrend: upTrend,
  };
};
