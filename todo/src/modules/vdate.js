const WEEK_LEN = 7;
const CALENDAR_SIZE = 42;

export default {
  isExpired(date) {
    const today = this.dropTime(new Date()).getTime();
    const copyDate = this.dropTime(new Date(date.getTime())).getTime();

    return copyDate < today;
  },

  isToday(date) {
    const today = this.dropTime(new Date());
    const copyDate = this.dropTime(new Date(date.getTime()));

    return today.getTime() === copyDate.getTime();
  },

  isWeek(date) {
    const monday = this.getMonday();
    const sunday = this.getSunday();

    sunday.setDate(sunday.getDate() + 1);

    return date.getTime() >= monday.getTime() && date.getTime() < sunday.getTime();
  },

  isMonth(date) {
    const firstMonthDay = this.firstMonthDay();
    const lastMonthDay = this.lastMonthDay();

    lastMonthDay.setDate(lastMonthDay.getDate() + 1);

    return date.getTime() >= firstMonthDay.getTime() && date.getTime() < lastMonthDay.getTime();
  },

  dropTime(date) {
    const coypDate = new Date(date.getTime());
    coypDate.setHours(0);
    coypDate.setMinutes(0);
    coypDate.setSeconds(0);
    coypDate.setMilliseconds(0);

    return coypDate;
  },

  getMonday(date = new Date()) {
    const copyDate = new Date(date.getTime());
    const weekDay = date.getDay();
    const day = date.getDate();
    const diff = day - weekDay + (!day ? -6 : 1);

    return this.dropTime(new Date(copyDate.setDate(diff)));
  },

  getSunday(date = new Date()) {
    const monday = this.getMonday(date);

    monday.setDate(monday.getDate() + 6);

    return this.dropTime(monday);
  },

  firstMonthDay(date = new Date()) {
    return this.dropTime(new Date(date.getFullYear(), date.getMonth(), 1));
  },

  lastMonthDay(date = new Date()) {
    return this.dropTime(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  },

  dateToText(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
