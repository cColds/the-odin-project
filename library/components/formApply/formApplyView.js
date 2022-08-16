export default class FormApplyView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};
  }

  render() {
    const self = this;
    const { form } = self.elements;
    const {
      node,
      appendMode = 'append',
      name,
      type,
      message,
    } = self.module.params;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!form || !(form instanceof HTMLElement)) {
      self.elements.form = document.createElement('form');
      self.elements.form.className = 'form-apply';

      node[appendMode](self.elements.form);
    } else {
      self.elements.form.innerHTML = '';
    }

    self.elements.form.innerHTML = `
      <p class="form__message">${message}</p>

      <button class="form__submit${type ? ` form__submit_${type}` : ''}" type="submit" aria-label="${name}">${name}</button>
    `;

    self.elements.submitBtn = self.elements.form.querySelector('.form__submit');

    self.module.events.publish('render');
  }
}
