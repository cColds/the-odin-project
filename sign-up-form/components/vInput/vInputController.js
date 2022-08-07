export default class VInputController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender());
  }

  onTogglePassVisible() {
    const self = this;
    const { isPassVisible } = self.module;

    self.module.togglePassVisible(!isPassVisible);
  }

  /* eslint-disable no-param-reassign */
  /* eslint-disable class-methods-use-this */
  onInputNumber(target, value, max) {
    const newValue = target.value + value;

    if (value.match(/\d/) && newValue !== '0') {
      if (newValue <= max) {
        target.value = newValue;
      }
    }
  }
  /* eslint-enable class-methods-use-this */
  /* eslint-enable no-param-reassign */

  onInput({ value }) {
    const self = this;

    self.module.input(value);
  }

  onRenderPassword() {
    const self = this;
    const { fieldInput, passwordState } = self.view.elements;

    fieldInput.addEventListener('input', ({ target: value }) => self.onInput(value));
    passwordState.addEventListener('click', () => self.onTogglePassVisible());
  }

  onRenderDate() {
    const self = this;
    const { fieldDay, fieldMonth, fieldYear } = self.view.elements;
    const value = {
      day: null,
      month: null,
      year: null,
    };

    fieldDay.addEventListener('keydown', ({ target, key }) => {
      self.onInputNumber(target, key, 99);
      value.day = Number(target.value);
      self.onInput({ value });
    });
    fieldDay.addEventListener('keypress', (e) => e.preventDefault());
    fieldDay.addEventListener('keyup', (e) => e.preventDefault());
    fieldDay.addEventListener('paste', (e) => e.preventDefault());

    fieldMonth.addEventListener('change', ({ target: { options, selectedIndex } }) => {
      value.month = Number(options[selectedIndex].value) - 1;
      self.onInput({ value });
    });

    fieldYear.addEventListener('keydown', ({ target, key }) => {
      self.onInputNumber(target, key, 9999);
      value.year = Number(target.value);
      self.onInput({ value });
    });
    fieldYear.addEventListener('keypress', (e) => e.preventDefault());
    fieldYear.addEventListener('keyup', (e) => e.preventDefault());
    fieldYear.addEventListener('paste', (e) => e.preventDefault());
  }

  onRenderText() {
    const self = this;
    const { fieldInput } = self.view.elements;

    fieldInput.addEventListener('input', ({ target: value }) => self.onInput(value));
  }

  onRender() {
    const self = this;
    const { settings } = self.module;

    if (settings.type === 'password') {
      self.onRenderPassword();
    } else if (settings.type === 'date') {
      self.onRenderDate();
    } else {
      self.onRenderText();
    }
  }
}
