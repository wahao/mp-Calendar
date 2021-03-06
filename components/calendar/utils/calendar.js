function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}

export class Calendar {
  constructor(year, month, day) {
    const currentDate = isValidDate(new Date(year, month, day)) ? new Date(year, month, day) : new Date()
    this.year = currentDate.getFullYear()
    this.month = currentDate.getMonth()
    this.day = currentDate.getDate()
  }
  getMonthDays() {
    // 获取本月的天数
    return (new Date(this.year, this.month + 1, 0)).getDate()
  }
  getDayWeek() {
    return (new Date(this.year, this.month, this.day)).getDay()
  }
  getDisDate(dis) {
    return new Date(new Date().getTime() + dis * 24 * 60 * 60 * 1000)
  }
  getThisWeek() {
    const WEEK = this.getDayWeek()
    return [this.getDisDate(0 - WEEK), this.getDisDate(6 - WEEK)]
  }
  getThisMonth() {
    const DAYS = this.getMonthDays()
    return [this.getDisDate(0 - this.day + 1), this.getDisDate(DAYS - this.day)]
  }
  dateFormat(fmt, date = new Date(this.year, this.month, this.day)) {
    date = new Date(date)
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  }
}