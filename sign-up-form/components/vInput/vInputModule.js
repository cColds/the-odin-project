import PubSub from '../../libs/pubSub.js';

export default class VInputModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.node = params?.node || null;
    self.settings = params?.settings || {};
    self.isValid = false;
    self.isPassVisible = false;
    self.value = null;
  }

  togglePassVisible(state) {
    const self = this;

    self.isPassVisible = state;

    self.events.publish('togglePassVisible', state);
  }

  validInput(value) {
    const self = this;
    const { valid = null, validError = null } = self.settings;
    const errors = [];

    if (valid?.reg && typeof valid?.reg === 'object') {
      valid.reg.forEach((r, i) => {
        if (!value.match(r) && validError.reg[i]) {
          errors.push(validError.reg[i]);
        }
      });
    } else if (valid?.reg && !value.match(valid.reg)) {
      errors.push(validError.reg);
    }

    if (valid?.minlength && value.length < valid?.minlength) {
      errors.push(validError.minlength);
    }

    if (valid?.maxlength && value.length > valid?.maxlength) {
      errors.push(validError.maxlength);
    }

    if (valid?.date) {
      const { day, month, year } = value;
      const date = new Date(year, month, day, 0, 0, 0, 0);

      if ((day === null && month === null && year === null)
        || !(date.getDate() === day
        && date.getMonth() === month
        && date.getFullYear() === year)
      ) {
        errors.push(validError.date);
      }
    }

    if (valid?.callback && typeof valid?.callback === 'object') {
      valid.callback.forEach((callback, i) => {
        if (!callback(value)) {
          errors.push(validError.callback[i]);
        }
      });
    } else if (valid?.callback && !valid?.callback(value)) {
      errors.push(validError.callback);
    }

    return {
      errors,
      state: errors.length > 0,
    };
  }

  input(value) {
    const self = this;
    const valid = self.validInput(value);

    self.isValid = valid.state;
    self.value = value;
    self.events.publish('showError', valid.errors);
  }
}
