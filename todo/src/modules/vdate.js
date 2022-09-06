const WEEK_LEN = 7;
const CALENDAR_SIZE = 42;

export default {
  firstMonthDay(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  },

  lastMonthDay(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },

  calendarDays(date = new Date()) {
    const firstDay = this.firstMonthDay(date);
    const from = 1 - ((firstDay.getDay() || WEEK_LEN) - 1);
    const to = CALENDAR_SIZE - -from;
    const days = [];

    for (let i = from; i < to; i += 1) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);

      days.push(day);
    }

    return days;
  },
};
