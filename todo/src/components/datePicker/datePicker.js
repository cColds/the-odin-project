import './scss/datePicker.scss';

import DatePickerModule from './datePicker.module';
import DatePickerView from './datePicker.view';
import DatePickerController from './datePicker.controller';

export default class DatePicker {
  constructor() {
    const self = this;
    const module = new DatePickerModule();
    const view = new DatePickerView(module);
    const controller = new DatePickerController(module, view);

    self.controller = controller;
  }
}
