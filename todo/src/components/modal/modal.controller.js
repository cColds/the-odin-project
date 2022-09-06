export default class ModalController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  close() {
    const self = this;

    self.events.publish('close');
  }

  open() {
    const self = this;

    self.events.publish('open');
  }

  setContent({
    title = 'Modal',
    isCritical = false,
    bodyRender = null,
    submit = null,
    reset = null,
  }) {
    const self = this;

    self.module.setContent({
      title, isCritical, bodyRender, submit, reset,
    });
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.events.publish('render', { node, appendType });

    const {
      overlay,
      closeBtn,
      resetBtn,
      submitBtn,
    } = self.view.elements;

    overlay.addEventListener('click', () => self.close());
    closeBtn.addEventListener('click', () => self.close());
    resetBtn.addEventListener('click', () => {
      if (typeof self.module.reset === 'function') {
        self.module.reset();
      }

      self.close();
      self.events.publish('reset');
    });
    submitBtn.addEventListener('click', () => {
      if (typeof self.module.submit === 'function') {
        if (self.module.submit()) {
          self.close();
          self.events.publish('submit');
        }
      } else {
        self.close();
        self.events.publish('submit');
      }
    });
  }
}
