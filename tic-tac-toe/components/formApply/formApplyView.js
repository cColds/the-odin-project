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
      message,
      btn,
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

      <div class="form__footer">
      <button class="form__btn" type="reset" aria-label="${btn.reset.title}">${btn.reset.title}</button>
        <button class="form__btn" type="submit" aria-label="${btn.submit.title}">${btn.submit.title}</button>
      </div>
    `;

    self.elements.submitBtn = self.elements.form.querySelector('button[type=submit]');
    self.elements.resetBtn = self.elements.form.querySelector('button[type=reset]');

    self.module.events.publish('render');
  }
}
