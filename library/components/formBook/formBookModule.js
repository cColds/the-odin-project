import PubSub from '../../libs/pubSub.js';

export default class FormBookModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.params = params;
    self.isValid = false;
  }

  inputCheck(inputId, value, options, showErors = true) {
    const self = this;
    const errors = [];

    if (options?.minlength && value.length < options.minlength) {
      errors.push(`Minimum length is ${options.minlength}`);
    }

    if (options?.maxlength && value.length > options.maxlength) {
      errors.push(`Maximum length is ${options.maxlength}`);
    }

    if (options?.min && Number(value) < options.min) {
      errors.push(`Minimum value is ${options.min}`);
    }

    if (options?.max && Number(value) > options.max) {
      errors.push(`Maximum value is ${options.max}`);
    }

    if (options?.required && value.trim().replace(/\s/g, '') === '') {
      errors.push('Required field');
    }

    if (showErors) {
      self.events.publish('showError', { inputId, errors });
    }

    return errors.length === 0;
  }

  checkForm(inputs, showErors = false) {
    const self = this;
    const inputsKeys = Object.keys(inputs);
    let isValid = true;

    for (let i = 0; i < inputsKeys.length; i += 1) {
      const { input: { value }, options } = inputs[inputsKeys[i]];

      if (!self.inputCheck(inputsKeys[i], value, options, showErors)) {
        isValid = false;
      }
    }

    self.isValid = isValid;
    self.events.publish('checkForm', isValid);
  }
}
