export default class ModalView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('toggleVisible', (isVisible) => self.toggleVisible(isVisible))
      .subscribe('hidden', () => self.hidden());
  }

  hidden() {
    const self = this;
    const { modalContent } = self.elements;

    modalContent.innerHTML = '';
  }

  toggleVisible(isVisible) {
    const self = this;
    const { container } = self.elements;

    if (isVisible) {
      container.classList.remove('modal_hidden');
      container.classList.add('modal_shown');
    } else {
      container.classList.remove('modal_shown');
      container.classList.add('modal_hidden');
    }
  }

  render() {
    const self = this;
    const { node } = self.module;
    let { container } = self.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t render, bad node');
    }

    if (!container || !(container instanceof HTMLElement)) {
      container = document.createElement('div');
      container.className = 'modal';
      self.elements.container = container;
      node.append(self.elements.container);
    } else {
      container.innerHTML = '';
    }

    container.innerHTML = `
      <div class="modal__container">
        <button class="modal__close" aria-label="close" type="button">
          <svg class="close__icon" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M76 25.64L70.36 20L48 42.36L25.64 20L20 25.64L42.36 48L20 70.36L25.64 76L48 53.64L70.36 76L76 70.36L53.64 48L76 25.64Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div class="modal__content"></div>
      </div>
    `;

    self.elements.modalCloseBtn = container.querySelector('.modal__close');
    self.elements.modalContent = container.querySelector('.modal__content');

    self.module.events.publish('render');
  }
}
