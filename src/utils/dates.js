const date_util = {
  /**
   * 将字符串2020-03-05 05:00:00转为 3月5日 字符串
   */
  formatDateToMonthAndDay(date_str) {
    console.log(date_str);
    const sourceDate = new Date(date_str);
    let month = sourceDate.getMonth() + 1;
    let day = sourceDate.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${month}月${day}日`;
  }
};

export default date_util;
