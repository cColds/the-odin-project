import Popover from '../popover/popover';

export default class DatePickerController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  get value() {
    const self = this;

    return self.module.value;
  }

  setValue(date) {
    const self = this;

    self.module.value = date;
  }

  changeCalendarMonth(type) {
    const self = this;

    self.module.changeCalendarMonth(type);
  }

  renderCalendar() {
    const self = this;
    const { datePicker } = self.view.elements;
    const popover = new Popover({ parent: datePicker }).controller;

    popover.render({ node: document.body });
    self.module.renderCalendar(popover);

    const {
      calendarDaysBtn,
      prevMonthBtn,
      curMonthBtn,
      nextMonthBtn,
    } = self.view.elements;

    calendarDaysBtn.forEach(([element, ,], i) => {
      element.addEventListener('click', () => {
        if (
          !element.classList.contains('date_disabled')
          && !element.classList.contains('date_acitve')
        ) {
          self.setValue(calendarDaysBtn[i][1]);
        }
      });
    });
    prevMonthBtn.addEventListener('click', () => self.changeCalendarMonth('prev'));
    curMonthBtn.addEventListener('click', () => self.changeCalendarMonth());
    nextMonthBtn.addEventListener('click', () => self.changeCalendarMonth('next'));

    self.events.subscribe('valueSetted', () => popover.close());
    popover.events.subscribe('close', () => self.module.resetMonth());
  }

  render({ node, appendType = 'append', classList = [] }) {
    const self = this;

    self.events.publish('render', { node, appendType, classList });

    const { datePicker } = self.view.elements;

    datePicker.addEventListener('click', () => self.renderCalendar());
  }
}
