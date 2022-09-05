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
    submit = null,
    reset = null,
  }) {
    const self = this;

    self.module.setContent({
      title, isCritical, submit, reset,
    });
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.events.publish('render', { node, appendType });

    const {
      overlay,
      modalContainer,
      closeBtn,
      resetBtn,
      submitBtn,
    } = self.view.elements;

    modalContainer.addEventListener('submit', (e) => e.preventDefault());

    overlay.addEventListener('click', () => self.close());
    closeBtn.addEventListener('click', () => self.close());
    resetBtn.addEventListener('click', () => {
      self.module?.reset();
      self.close();

      self.events.publish('reset');
    });
    submitBtn.addEventListener('click', () => {
      self.module?.submit();
      self.close();

      self.events.publish('submit');
    });
  }
}
