const WEEK_LEN = 7;
const CALENDAR_SIZE = 42;

export default {
  isToday(date) {
    const today = new Date();
    const copyDate = new Date(date.getTime());

    this.dropTime(today);
    this.dropTime(copyDate);

    return today.getTime() === copyDate.getTime();
  },

  isWeek(date) {
    const monday = this.getMonday();
    const sunday = this.getSunday();

    return date.getTime() >= monday.getTime() && date.getTime() <= sunday.getTime();
  },

  isMonth(date) {
    const firstMonthDay = this.firstMonthDay();
    const lastMonthDay = this.lastMonthDay();

    return date.getTime() >= firstMonthDay.getTime() && date.getTime() <= lastMonthDay.getTime();
  },

  dropTime(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  },

  getMonday(date = new Date()) {
    const copyDate = new Date(date.getTime());
    const weekDay = date.getDay();
    const day = date.getDate();
    const diff = day - weekDay + (!day ? -6 : 1);

    return this.dropTime(new Date(copyDate.setDate(diff)));
  },

  getSunday(date = new Date()) {
    const copyDate = new Date(date.getTime());
    const weekDay = date.getDay();
    const day = date.getDate();
    const diff = day + weekDay - (!day ? 6 : -1);

    return this.dropTime(new Date(copyDate.setDate(diff)));
  },

  firstMonthDay(date = new Date()) {
    return this.dropTime(new Date(date.getFullYear(), date.getMonth(), 1));
  },

  lastMonthDay(date = new Date()) {
    return this.dropTime(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  },

  dateToText(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  },

  calendarDays(date = new Date()) {
    const firstDay = this.firstMonthDay(date);
    const from = 1 - ((firstDay.getDay() || WEEK_LEN) - 1);
    const to = CALENDAR_SIZE - -from;
    const days = [];

    for (let i = from; i < to; i += 1) {
      const day = this.dropTime(new Date(date.getFullYear(), date.getMonth(), i));

      days.push(day);
    }

    return days;
  },
};
