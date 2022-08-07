export default class VInputView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('showError', (errors) => self.showError(errors))
      .subscribe('togglePassVisible', (state) => self.togglePassVisible(state));
  }

  togglePassVisible(state) {
    const self = this;
    const { fieldInput, passwordState } = self.elements;

    if (state) {
      passwordState.classList.remove('password__state_hide');
      passwordState.classList.add('password__state_visible');
      fieldInput.type = 'text';
    } else {
      passwordState.classList.remove('password__state_visible');
      passwordState.classList.add('password__state_hide');
      fieldInput.type = 'password';
    }
  }

  showError(errors) {
    const self = this;
    const { container, fieldError } = self.elements;

    if (errors.length > 0) {
      container.classList.add('field_error');
    } else {
      container.classList.remove('field_error');
    }

    /* eslint-disable indent */
    fieldError.innerHTML = `
      ${errors.map((error) => {
        let html = '';

        if (typeof error === 'object') {
          html += error.map((e) => `<li class="error">${e}</li>`).join('');
        } else {
          html += `<li class="error">${error}</li>`;
        }

        return html;
      }).join('')}
    `;
    /* eslint-enable indent */
  }

  renderPassword() {
    const self = this;
    const { settings } = self.module;
    const { container } = self.elements;

    container.innerHTML = `
      <label class="field__label" for="${settings.id}">${settings.label}</label>
      <div class="field__container field__container_password">
        <input id="${settings.id}" class="field__input field__input_password" name="${settings.id}" type="password">

        <button class="password__state password__state_hide" type="button" aria-label="Toggle Visible">
            <svg class="icon icon_visible" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24.8489 11.8663C22.4952 7.27387 17.8355 4.16666 12.5 4.16666C7.16447 4.16666 2.50345 7.27604 0.151018 11.8668C0.0517306 12.0632 0 12.2801 0 12.5002C0 12.7203 0.0517306 12.9373 0.151018 13.1337C2.50475 17.7261 7.16447 20.8333 12.5 20.8333C17.8355 20.8333 22.4965 17.724 24.8489 13.1332C24.9482 12.9368 25 12.7199 25 12.4998C25 12.2797 24.9482 12.0627 24.8489 11.8663V11.8663ZM12.5 18.75C11.2638 18.75 10.0555 18.3834 9.02766 17.6967C7.99985 17.0099 7.19878 16.0338 6.72573 14.8918C6.25268 13.7497 6.12891 12.4931 6.37007 11.2807C6.61123 10.0683 7.20648 8.95466 8.08056 8.08058C8.95464 7.2065 10.0683 6.61125 11.2807 6.37009C12.493 6.12893 13.7497 6.2527 14.8917 6.72575C16.0338 7.1988 17.0099 7.99988 17.6967 9.02768C18.3834 10.0555 18.75 11.2639 18.75 12.5C18.7504 13.3209 18.589 14.1338 18.275 14.8922C17.9611 15.6507 17.5007 16.3399 16.9203 16.9203C16.3398 17.5008 15.6507 17.9611 14.8922 18.2751C14.1338 18.589 13.3208 18.7504 12.5 18.75V18.75ZM12.5 8.33333C12.1281 8.33853 11.7586 8.39386 11.4015 8.49783C11.6958 8.89786 11.8371 9.39014 11.7996 9.88539C11.7621 10.3806 11.5484 10.8461 11.1972 11.1973C10.846 11.5485 10.3806 11.7622 9.88537 11.7996C9.39012 11.8371 8.89784 11.6958 8.49781 11.4015C8.27001 12.2407 8.31113 13.1302 8.61538 13.9449C8.91962 14.7595 9.47167 15.4582 10.1938 15.9427C10.916 16.4271 11.7719 16.6729 12.641 16.6455C13.5102 16.618 14.3489 16.3187 15.039 15.7896C15.7291 15.2606 16.236 14.5284 16.4882 13.6962C16.7404 12.864 16.7253 11.9736 16.445 11.1504C16.1647 10.3272 15.6333 9.61269 14.9256 9.10734C14.2179 8.60199 13.3696 8.33128 12.5 8.33333V8.33333Z"
                fill="currentColor"
              />
            </svg>

            <svg class="icon icon_hide" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.5 18.125C9.53715 18.125 7.13871 15.8316 6.91801 12.9254L2.82035 9.7586C2.28168 10.4344 1.78597 11.1488 1.38598 11.9301C1.29662 12.1068 1.25006 12.3021 1.25006 12.5002C1.25006 12.6983 1.29662 12.8936 1.38598 13.0703C3.50433 17.2035 7.69808 20 12.5 20C13.5512 20 14.5653 19.8438 15.5426 19.5914L13.5157 18.0231C13.1809 18.0877 12.841 18.1218 12.5 18.125ZM24.7586 20.3945L20.4403 17.057C21.7521 15.9515 22.8309 14.5962 23.6141 13.0699C23.7035 12.8932 23.75 12.6979 23.75 12.4998C23.75 12.3017 23.7035 12.1065 23.6141 11.9297C21.4957 7.79649 17.302 5 12.5 5C10.4889 5.00244 8.51043 5.50874 6.74535 6.47266L1.77582 2.63164C1.71102 2.58122 1.63691 2.54405 1.55774 2.52228C1.47857 2.5005 1.39588 2.49454 1.3144 2.50474C1.23293 2.51493 1.15426 2.54108 1.08289 2.58169C1.01152 2.6223 0.948858 2.67657 0.898475 2.74141L0.131678 3.72852C0.0299589 3.85937 -0.0156209 4.02527 0.00496352 4.18973C0.0255479 4.35418 0.110611 4.50373 0.241444 4.60547L23.2243 22.3684C23.2891 22.4188 23.3632 22.456 23.4423 22.4777C23.5215 22.4995 23.6042 22.5055 23.6857 22.4953C23.7671 22.4851 23.8458 22.4589 23.9172 22.4183C23.9886 22.3777 24.0512 22.3234 24.1016 22.2586L24.8688 21.2715C24.9705 21.1406 25.016 20.9747 24.9953 20.8102C24.9747 20.6457 24.8895 20.4962 24.7586 20.3945ZM17.5821 14.8477L16.0469 13.6609C16.1762 13.2873 16.2448 12.8953 16.25 12.5C16.2577 11.9212 16.1294 11.3487 15.8756 10.8284C15.6219 10.3082 15.2496 9.85467 14.7888 9.50438C14.3279 9.15409 13.7914 8.91677 13.2222 8.81146C12.653 8.70616 12.067 8.73582 11.5114 8.89805C11.7469 9.21723 11.8743 9.60332 11.875 10C11.8692 10.132 11.849 10.263 11.8149 10.3906L8.93949 8.16836C9.93831 7.33368 11.1984 6.87597 12.5 6.875C13.2388 6.87459 13.9705 7.01981 14.6531 7.30234C15.3358 7.58488 15.956 7.9992 16.4784 8.52161C17.0008 9.04402 17.4152 9.66428 17.6977 10.3469C17.9802 11.0296 18.1254 11.7612 18.125 12.5C18.125 13.3449 17.9184 14.132 17.5821 14.8477Z"
                fill="currentColor"
              />
            </svg>
        </button>
      </div>
      <ul class="field__error"></ul>
    `;

    self.elements.fieldInput = container.querySelector('.field__input');
    self.elements.fieldError = container.querySelector('.field__error');
    self.elements.passwordState = container.querySelector('.password__state');
  }

  renderDate() {
    const self = this;
    const { settings } = self.module;
    const { container } = self.elements;

    container.innerHTML = `
      <label class="field__label" for="${settings.id}-day">${settings.label}</label>
      <div class="field__container field__container_date">
        <input id="${settings.id}-day" class="field__input" name="${settings.id}-day" type="text" placeholder="Day">
        <select id="${settings.id}-month" class="field__select" name="${settings.id}-month" type="text" placeholder="Month" aria-label="Date of Birth">
          <option selected disabled>Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <input id="${settings.id}-year" class="field__input" name="${settings.id}-year" type="text" placeholder="Year">
      </div>
      <ul class="field__error"></ul>
    `;

    self.elements.fieldDay = container.querySelector(`#${settings.id}-day`);
    self.elements.fieldMonth = container.querySelector(`#${settings.id}-month`);
    self.elements.fieldYear = container.querySelector(`#${settings.id}-year`);
    self.elements.fieldError = container.querySelector('.field__error');
  }

  renderText() {
    const self = this;
    const { settings } = self.module;
    const { container } = self.elements;

    container.innerHTML = `
      <label class="field__label" for="${settings.id}">${settings.label}</label>
      <input id="${settings.id}" class="field__input" name="${settings.id}" type="text">
      <ul class="field__error"></ul>
    `;

    self.elements.fieldInput = container.querySelector('.field__input');
    self.elements.fieldError = container.querySelector('.field__error');
  }

  render() {
    const self = this;
    const { node, settings } = self.module;
    let { container } = self.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t render, bad node');
    }

    if (!container || !(container instanceof HTMLElement)) {
      container = document.createElement('div');
      container.className = 'field';
      self.elements.container = container;
      node.append(self.elements.container);
    } else {
      container.innerHTML = '';
    }

    if (settings.type === 'password') {
      self.renderPassword();
    } else if (settings.type === 'date') {
      self.renderDate();
    } else {
      self.renderText();
    }

    self.module.events.publish('render');
  }
}
