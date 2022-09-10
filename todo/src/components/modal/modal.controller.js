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

  get body() {
    const self = this;

    return self.view.elements.modalBody;
  }

  remove() {
    const self = this;

    self.events.publish('remove');
  }

  close() {
    const self = this;

    self.events.publish('close');
  }

  open() {
    const self = this;

    self.events.publish('open');
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.events.publish('render', { node, appendType });

    const { modal, overlay, closeBtn } = self.view.elements;
    const { open } = self.module;

    overlay.addEventListener('click', () => self.close());
    closeBtn.addEventListener('click', () => self.close());

    window.addEventListener('animationend', ({ animationName }) => {
      if (animationName === 'modal_open-container') {
        modal.classList.remove('modal_open');
      }

      if (animationName === 'modal_close-overlay') {
        modal.classList.remove('modal_close');
        self.remove();
      }
    });

    if (open) {
      self.open();
    }
  }
}
