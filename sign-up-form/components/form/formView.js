import VInput from '../vInput/index.js';

export default class FormView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('changeTab', ({ prevTabId, tabId }) => self.changeTab(prevTabId, tabId))
      .subscribe('setValid', (isValid) => self.toggleSubmit(isValid));
  }

  changeTab(prevTabId, tabId) {
    const self = this;
    const { tabs } = self.elements;

    tabs[prevTabId].classList.remove('tab_active');
    tabs[tabId].classList.add('tab_active');

    switch (tabId) {
      case 0:
        self.renderLogin();
        break;
      case 1:
        self.renderSignup();
        break;
      default:
        break;
    }
  }

  toggleSubmit(isValid) {
    const self = this;
    const { submit } = self.elements;

    submit.disabled = !isValid;
  }

  renderLogin() {
    const self = this;
    const { formContent } = self.elements;

    formContent.innerHTML = `
      <fieldset id="field-username" class="form__fieldset"></fieldset>
      <fieldset id="field-password" class="form__fieldset"></fieldset>

      <button class="form__submit" type="submit" aria-label="Log In">Log In</button>
    `;

    const inputs = {
      username: new VInput({
        node: formContent.querySelector('#field-username'),
        settings: {
          label: 'Username',
          id: 'username',
          valid: {
            minlength: 1,
          },
        },
      }),

      password: new VInput({
        node: formContent.querySelector('#field-password'),
        settings: {
          label: 'Password',
          id: 'password',
          type: 'password',
          valid: {
            minlength: 1,
          },
        },
      }),
    };

    self.elements.inputs = { ...inputs };
    self.elements.submit = formContent.querySelector('.form__submit');

    self.module.events.publish('renderTab');
  }

  renderSignup() {
    const self = this;
    const { formContent } = self.elements;

    formContent.innerHTML = `
      <fieldset id="field-username" class="form__fieldset"></fieldset>
      <fieldset id="field-password" class="form__fieldset"></fieldset>
      <fieldset id="field-date" class="form__fieldset"></fieldset>
      <fieldset id="field-email" class="form__fieldset"></fieldset>

      <button class="form__submit" type="submit" aria-label="Sign Up">Sign Up</button>
    `;

    const inputs = {
      username: new VInput({
        node: formContent.querySelector('#field-username'),
        settings: {
          label: 'Username',
          id: 'username',
          valid: {
            reg: '([a-z-A-Z]{1,})([0-9]*)',
            minlength: 6,
            maxlength: 16,
          },
          validError: {
            reg: 'Can contain the characters a-z, A-Z and optionally 0-9',
            minlength: 'Minimum length is 6 characters',
            maxlength: 'Maximum length is 24 characters',
          },
        },
      }),

      password: new VInput({
        node: formContent.querySelector('#field-password'),
        settings: {
          label: 'Password',
          id: 'password',
          type: 'password',
          valid: {
            reg: [
              '^(?=.*[a-z])',
              '(?=.*[A-Z])',
              '(?=.*[0-9])',
              '(?=.*[!@#\\$%\\^&\\*])',
            ],
            minlength: 8,
            maxlength: 24,
          },
          validError: {
            reg: [
              'Must contain at least 1 lowercase alphabetical character',
              'Must contain at least 1 uppercase alphabetical character',
              'Must contain at least 1 numeric character',
              'Must contain at least one special character',
            ],
            minlength: 'Minimum length is 8 characters',
            maxlength: 'Maximum length is 24 characters',
          },
        },
      }),

      confirmPassword: new VInput({
        node: formContent.querySelector('#field-password'),
        settings: {
          label: 'Confirm Password',
          id: 'confirm-password',
          type: 'password',
          valid: null,
          validError: null,
        },
      }),

      dateOfBirth: new VInput({
        node: formContent.querySelector('#field-date'),
        settings: {
          label: 'Date of Birth',
          id: 'date',
          type: 'date',
          valid: {
            date: true,
            callback: [
              ({ day, month, year }) => {
                const msecInyear = 31557600000;
                const currentDate = new Date();
                const date = new Date(year, month, day, 0, 0, 0, 0);

                return Math.floor((currentDate - date) / msecInyear) >= 18;
              },
            ],
          },
          validError: {
            date: 'Incorrect date',
            callback: [
              'Only for persons over 18',
            ],
          },
        },
      }),

      email: new VInput({
        node: formContent.querySelector('#field-email'),
        settings: {
          label: 'Email',
          id: 'email',
          type: 'email',
          valid: {
            reg: '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
          },
          validError: {
            reg: 'Wrong email',
          },
        },
      }),
    };

    inputs.confirmPassword.module.settings = {
      valid: {
        callback: (value) => value === inputs.password.module.value,
      },
      validError: {
        callback: 'Passwords don\'t match',
      },
    };

    self.elements.inputs = { ...inputs };
    self.elements.submit = formContent.querySelector('.form__submit');

    self.module.events.publish('renderTab');
  }

  render() {
    const self = this;
    const { node, tabId } = self.module;
    let { container } = self.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t render, bad node');
    }

    if (!container || !(container instanceof HTMLElement)) {
      container = document.createElement('form');
      container.className = 'form';
      self.elements.container = container;
      node.append(self.elements.container);
    } else {
      container.innerHTML = '';
    }

    container.innerHTML = `
      <div class="form__tab">
        <button id="tab-login" class="tab" type="button">Log In</button>
        <button id="tab-signup" class="tab" type="button">Sign Up</button>
      </div>
      <div class="form__content"></div>
    `;

    self.elements.tabs = [
      container.querySelector('#tab-login'),
      container.querySelector('#tab-signup'),
    ];
    self.elements.formContent = container.querySelector('.form__content');

    self.changeTab(0, tabId);

    self.module.events.publish('render');
  }
}
