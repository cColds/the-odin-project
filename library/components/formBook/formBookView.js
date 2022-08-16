export default class FormBookView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('showError', ({ inputId, errors }) => self.showError(inputId, errors))
      .subscribe('checkForm', (state) => self.checkForm(state));
  }

  /* eslint-disable indent */
  static createField(title, id, type) {
    return `
      <label class="field__label">
        ${title}
        ${(() => {
          if (type === 'checkbox') {
            return `
              <input id="${id}" class="field__input field__input_checkbox" type="${type}">
              <div class="field__checkbox"></div>
            `;
          }
          return `<input id="${id}" class="field__input" type="${type}">`;
        })()}
      </label>
      <ul id="${id}-error" class="field__error"></ul>
    `;
  }
  /* eslint-enable indent */

  showError(inputId, errors) {
    const self = this;
    const { inputs } = self.elements;

    if (errors.length) {
      inputs[inputId].error.innerHTML = `
        ${errors.map((error) => `<li>${error}</li>`).join('')}
      `;
      inputs[inputId].error.classList.add('field__error_show');
    } else {
      inputs[inputId].error.classList.remove('field__error_show');
    }
  }

  checkForm(state) {
    const self = this;
    const { submitBtn } = self.elements;

    submitBtn.disabled = !state;
  }

  render() {
    const self = this;
    const { form } = self.elements;
    const { node, appendMode = 'append', name } = self.module.params;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!form || !(form instanceof HTMLElement)) {
      self.elements.form = document.createElement('form');
      self.elements.form.className = 'form-book';

      node[appendMode](self.elements.form);
    } else {
      self.elements.form.innerHTML = '';
    }

    self.elements.form.innerHTML = `
      <fieldset class="form__field">
        ${FormBookView.createField('Title', 'book-title')}
      </fieldset>

      <fieldset class="form__field">
        ${FormBookView.createField('Author', 'book-author')}
      </fieldset>

      <fieldset class="form__field">
        ${FormBookView.createField('Pages Read', 'book-pages-read', 'number')}
      </fieldset>

      <fieldset class="form__field">
        ${FormBookView.createField('Total Pages', 'book-total-pages', 'number')}
      </fieldset>

      <fieldset class="form__field form__field_checkbox">
        ${FormBookView.createField('Is Read', 'book-is-read', 'checkbox')}
      </fieldset>

      <button class="form__submit" type="submit" aria-label="${name}">${name}</button>
    `;

    self.elements.submitBtn = self.elements.form.querySelector('.form__submit');

    const inputsEl = [...self.elements.form.querySelectorAll('[id^="book-"')];
    self.elements.inputs = {};

    for (let i = 0; i < inputsEl.length; i += 2) {
      const input = inputsEl[i];
      const error = inputsEl[i + 1];

      if (self.module.params?.values) {
        const value = self.module.params.values[input.id];

        if (input.type === 'checkbox') {
          input.checked = value;
        } else {
          input.value = value;
        }
      }

      self.elements.inputs[input.id] = {
        input,
        error,
      };
    }

    self.elements.inputs['book-title'].options = { minlength: 1, maxlength: 64, required: true };
    self.elements.inputs['book-author'].options = { minlength: 1, maxlength: 64, required: true };
    self.elements.inputs['book-pages-read'].options = { min: 0, max: 99999, required: true };
    self.elements.inputs['book-total-pages'].options = { min: 1, max: 99999, required: true };

    self.module.events.publish('render');
  }
}
