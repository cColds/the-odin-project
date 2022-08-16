export default class ModalView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('show', () => self.show())
      .subscribe('hide', () => self.hide())
      .subscribe('clear', () => self.clear())
      .subscribe('setTitle', (title) => self.setTitle(title));
  }

  show() {
    const self = this;
    const { modal } = self.elements;

    modal.classList.remove('modal_hide');
    modal.classList.add('modal_show');

    document.body.parentElement.dataset.modalShow = true;
  }

  hide() {
    const self = this;
    const { modal } = self.elements;

    modal.classList.remove('modal_show');
    modal.classList.add('modal_hide');
  }

  clear() {
    const self = this;
    const { modal, title, content } = self.elements;

    modal.classList.remove('modal_hide');
    title.textContent = 'Modal';
    content.innerHTML = '';

    document.body.parentElement.dataset.modalShow = false;
  }

  setTitle(title) {
    const self = this;
    const { title: modalTitle } = self.elements;

    modalTitle.textContent = title;
  }

  render() {
    const self = this;
    const { modal } = self.elements;
    const { node, appendMode = 'append' } = self.module.params;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!modal || !(modal instanceof HTMLElement)) {
      self.elements.modal = document.createElement('div');
      self.elements.modal.className = 'modal';

      node[appendMode](self.elements.modal);
    } else {
      self.elements.modal.innerHTML = '';
    }

    self.elements.modal.innerHTML = `
      <div class="modal-container">
        <header class="modal__header">
          <h2 class="header__title">Modal</h2>

          <button class="header__btn-close" type="button" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </header>

        <div class="modal__content"></div>
      </div>
    `;

    self.elements.container = self.elements.modal.querySelector('.modal-container');
    self.elements.title = self.elements.modal.querySelector('.header__title');
    self.elements.btnClose = self.elements.modal.querySelector('.header__btn-close');
    self.elements.content = self.elements.modal.querySelector('.modal__content');

    self.module.events.publish('render');
  }
}
