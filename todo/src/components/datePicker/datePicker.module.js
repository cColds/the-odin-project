import PubSub from '../../libs/pubSub';
import vdate from '../../modules/vdate';

export default class DatePickerModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
    self.calendarMonth = new Date().getMonth();
    self.calendarYear = new Date().getFullYear();
    self.today = vdate.today;
    self.tomorrow = vdate.tomorrow;
    self.weekend = vdate.weekend;
  }

  set value(date) {
    const self = this;
    const prev = self.date;

    self.date = vdate.dropTime(date);

    if (date) {
      self.calendarMonth = date.getMonth();
      self.calendarYear = date.getFullYear();
    } else {
      self.calendarMonth = new Date().getMonth();
      self.calendarYear = new Date().getFullYear();
    }

    self.events.publish('setValue', { prev, current: self.date });
  }

  get value() {
    const self = this;

    return self.date ? new Date(self.date) : null;
  }

  getValueText() {
    const self = this;

    return vdate.dateToText(self.value);
  }

  getCalendarText() {
    const self = this;
    const monthName = new Date(0, self.calendarMonth, 1).toLocaleString('en', { month: 'long' });

    return `${monthName}, ${self.calendarYear}`;
  }

  resetMonth() {
    const self = this;

    self.calendarMonth = (self.value || new Date()).getMonth();
    self.calendarYear = (self.value || new Date()).getFullYear();
  }

  changeCalendarMonth(type) {
    const self = this;

    if (type === 'prev') {
      self.calendarMonth -= 1;
    } else if (type === 'next') {
      self.calendarMonth += 1;
    } else {
      self.resetMonth();
    }

    if (self.calendarMonth > 11) {
      self.calendarMonth = 0;
      self.calendarYear += 1;
    } else if (self.calendarMonth < 0) {
      self.calendarMonth = 11;
      self.calendarYear -= 1;
    }

    self.events.publish('updateCalendar', self.calendarMonth);
  }

  getCalendarDays(month = this.calendarMonth, year = this.calendarYear) {
    const self = this;

    const date = self.value || new Date();

    if (typeof month === 'number') {
      date.setYear(year);
      date.setMonth(month);
    }

    return vdate.calendarDays(date);
  }
}
