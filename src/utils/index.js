/**
 * 计算两个日期之间相差的天数
 * @param date1 dayjs() //时间戳
 * @param date2 dayjs() //时间戳
 */
export const dateDiff = (date1, date2) => {
  return date2.diff(date1, 'day') + 1;
};