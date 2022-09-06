export default class DatePickerView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType, classList }) => self.render({ node, appendType, classList }))
      .subscribe('renderCalendar', (popover) => self.renderCalendar(popover))
      .subscribe('setValue', ({ prev, current }) => self.setValue({ prev, current }))
      .subscribe('updateCalendar', () => self.updateCalendar());
  }

  setValue({ prev, current }) {
    const self = this;
    const { calendarDaysBtn } = self.elements;
    const prevBtn = calendarDaysBtn.filter((btn) => btn[1] === prev)[0];
    const currentBtn = calendarDaysBtn.filter((btn) => btn[1] === current)[0];

    prevBtn?.[0].classList.remove('date_active');
    currentBtn?.[0].classList.add('date_active');

    self.update();

    self.module.events.publish('valueSetted');
  }

  updateCalendar() {
    const self = this;
    const { value, calendarMonth } = self.module;
    const { calendarTitle, calendarDaysBtn } = self.elements;
    const calendarDays = self.module.getCalendarDays(calendarMonth);

    calendarTitle.textContent = self.module.getCalendarText();

    for (let i = 0; i < calendarDaysBtn.length; i += 1) {
      const [element, ,] = calendarDaysBtn[i];
      const day = calendarDays[i];
      const dayMonth = day.getMonth();

      if (dayMonth !== calendarMonth) {
        element.classList.remove('date_active');
        element.classList.add('date_disabled');
      } else {
        element.classList.remove('date_disabled', 'date_active');

        if (value && value.getTime() === day.getTime()) {
          element.classList.add('date_active');
        }
      }

      element.textContent = day.getDate();
      calendarDaysBtn[i][1] = day;
    }
  }

  renderCalendarDays() {
    const self = this;
    const { value } = self.module;
    const { calendarDays: calendarDaysElement } = self.elements;
    const calendarDays = self.module.getCalendarDays();
    const currentMonth = value?.getMonth() || new Date().getMonth();
    const calendarBodyElement = document.createElement('tbody');
    calendarBodyElement.classList.add('days__body');

    const createCalendarRow = () => {
      const row = document.createElement('tr');
      row.classList.add('calendar__days-row');

      return row;
    };
    const createCalendarCell = (classList, textContent) => {
      const cell = document.createElement('td');
      cell.classList.add(...classList);
      cell.textContent = textContent;

      return cell;
    };

    let calendarRow = createCalendarRow();
    self.elements.calendarDaysBtn = [];

    for (let i = 0; i < calendarDays.length; i += 1) {
      const day = calendarDays[i];
      const dayMonth = day.getMonth();
      const isWeeekEnd = !((i + 1) % 7);
      let cell = null;

      if (dayMonth !== currentMonth) {
        cell = createCalendarCell(['date', 'date_disabled'], day.getDate());
      } else {
        cell = createCalendarCell(['date'], day.getDate());

        if (value?.getTime() === day.getTime()) {
          cell.classList.add('date_active');
        }
      }

      calendarRow.append(cell);
      self.elements.calendarDaysBtn.push([
        cell,
        day,
      ]);

      if (isWeeekEnd) {
        calendarBodyElement.append(calendarRow);
        calendarRow = createCalendarRow();
      }
    }

    calendarDaysElement.append(calendarBodyElement);
  }

  renderCalendar(popover) {
    const self = this;

    self.elements.calendar = document.createElement('div');
    self.elements.calendar.classList.add('date-picker__calendar');

    self.elements.calendar.innerHTML = `
      <div class="calendar-container">
        <button id="today-btn" class="btn calendar__btn" type="button" aria-label="Date Today">
          <span class="material-symbols-rounded btn-icon">today</span>
          Today
          <span class="btn__week-day">Fr</span>
        </button>

        <button id="tomorrow-btn" class="btn calendar__btn" type="button" aria-label="Date Tomorrow">
          <span class="material-symbols-rounded btn-icon">sunny</span>
          Tomorrow
          <span class="btn__week-day">Sa</span>
        </button>

        <button id="weekend-btn" class="btn calendar__btn" type="button" aria-label="Date Weekend">
          <span class="material-symbols-rounded btn-icon">weekend</span>
          Weekend
          <span class="btn__week-day">Sa 3 Sep</span>
        </button>

        <button id="no-date-btn" class="btn calendar__btn" type="button" aria-label="Date None">
          <span class="material-symbols-rounded btn-icon">schedule</span>
          No date
        </button>
      </div>

      <div class="calendar-container">
        <div class="calendar__header">
          <h3 class="calendar__title">${self.module.getCalendarText()}</h3>

          <div class="calender__pagination">
            <button id="prev-month-btn" class="btn" type="button" aria-label="Previous Month">
              <span class="material-symbols-rounded btn-icon">navigate_before</span>
            </button>

            <button id="cur-month-btn" class="btn" type="button" aria-label="Current Month">
              <span class="material-symbols-rounded btn-icon">circle</span>
            </button>

            <button id="next-month-btn" class="btn" type="button" aria-label="Next Month">
              <span class="material-symbols-rounded btn-icon">navigate_next</span>
            </button>
          </div>
        </div>

        <table class="calendar__days">
          <thead class="days__header">
            <tr class="calendar__days-row">
              <td>Mo</td>
              <td>Tu</td>
              <td>We</td>
              <td>Th</td>
              <td>Fr</td>
              <td>Sa</td>
              <td>Su</td>
            </tr>
          </thead>
        </tabel>
      </div>
    `;

    self.elements.calendarTitle = self.elements.calendar.querySelector('.calendar__title');
    self.elements.todayBtn = self.elements.calendar.querySelector('#today-btn');
    self.elements.tomorrowBtn = self.elements.calendar.querySelector('#tomorrow-btn');
    self.elements.weekendBtn = self.elements.calendar.querySelector('#weekend-btn');
    self.elements.noDateBtn = self.elements.calendar.querySelector('#no-date-btn');
    self.elements.prevMonthBtn = self.elements.calendar.querySelector('#prev-month-btn');
    self.elements.curMonthBtn = self.elements.calendar.querySelector('#cur-month-btn');
    self.elements.nextMonthBtn = self.elements.calendar.querySelector('#next-month-btn');
    self.elements.calendarDays = self.elements.calendar.querySelector('.calendar__days');
    self.renderCalendarDays();

    popover.body.append(self.elements.calendar);
    popover.show('top');
  }

  update() {
    const self = this;
    const { value } = self.module;
    const { datePicker, value: valueElement } = self.elements;

    if (!value) {
      datePicker.classList.add('date-picker_empty');
      valueElement.textContent = 'Select date';
    } else {
      datePicker.classList.remove('date-picker_empty');
      valueElement.textContent = self.module.getValueText();
    }
  }

  render({ node, appendType, classList }) {
    const self = this;
    const { datePicker } = self.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!datePicker || !(datePicker instanceof HTMLElement)) {
      self.elements.datePicker = document.createElement('div');
      self.elements.datePicker.classList.add(...classList, 'date-picker');

      node[appendType](self.elements.datePicker);
    } else {
      self.elements.datePicker.innerHTML = '';
    }

    self.elements.datePicker.innerHTML = `
      <span class="date-picker__value"></span>
      <span class="material-symbols-rounded date-picker__icon">schedule</span>
    `;

    self.elements.value = self.elements.datePicker.querySelector('.date-picker__value');

    self.update();
  }
}
