export default class ModalView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('close', () => self.close())
      .subscribe('open', () => self.open())
      .subscribe('remove', () => self.remove());
  }

  remove() {
    const self = this;
    const { modal } = self.elements;

    modal.remove();
  }

  close() {
    const self = this;
    const { modal } = self.elements;

    modal.classList.add('modal_close');
  }

  open() {
    const self = this;
    const { modal } = self.elements;

    modal.classList.add('modal_open');
  }

  render({ node, appendType }) {
    const self = this;
    const { modal } = self.elements;
    const { title } = self.module;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!modal || !(modal instanceof HTMLElement)) {
      self.elements.modal = document.createElement('div');
      self.elements.modal.classList.add('modal');

      node[appendType](self.elements.modal);
    } else {
      self.elements.modal.innerHTML = '';
    }

    self.elements.modal.innerHTML = `
      <div class="modal-overlay"></div>

      <div class="modal-container">
        <div class="modal__header">
          <h2 class="modal__title">${title}</h2>

          <button class="btn btn_primary modal__close-btn" type="button" aria-label="Close">
            <span class="material-symbols-rounded close-btn__icon">close</span>
          </button>
        </div>

        <div class="modal__body"></div>
      </div>
    `;

    self.elements.overlay = self.elements.modal.querySelector('.modal-overlay');
    self.elements.modalContainer = self.elements.modal.querySelector('.modal-container');
    self.elements.modalTitle = self.elements.modalContainer.querySelector('.modal__title');
    self.elements.closeBtn = self.elements.modalContainer.querySelector('.modal__close-btn');
    self.elements.modalBody = self.elements.modalContainer.querySelector('.modal__body');
  }
}
