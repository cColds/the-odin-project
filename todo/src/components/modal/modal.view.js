export default class ModalView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('close', () => self.close())
      .subscribe('open', () => self.open())
      .subscribe('setContent', ({ title, isCritical }) => self.setContent({ title, isCritical }));
  }

  close() {
    const self = this;
    const { modal } = self.elements;

    modal.classList.remove('modal_open');
  }

  open() {
    const self = this;
    const { modal } = self.elements;

    modal.classList.add('modal_open');
  }

  setContent({ title, isCritical }) {
    const self = this;
    const { modalTitle, submitBtn } = self.elements;

    modalTitle.textContent = title;

    if (isCritical) {
      submitBtn.classList.add('btn_critical');
    } else {
      submitBtn.classList.remove('btn_critical');
    }
  }

  render({ node, appendType }) {
    const self = this;
    const { modal } = self.elements;

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

      <form class="modal-container">
        <div class="modal__header">
          <h2 class="modal__title">Modal Title</h2>

          <button class="btn modal__close-btn" type="button" aria-label="Close">
            <span class="material-symbols-rounded close-btn__icon">close</span>
          </button>
        </div>

        <div class="modal__body"></div>

        <div class="modal__footer">
          <button class="btn btn_primary" type="reset" aria-label="Cancel">Cancel</button>
          <button class="btn" type="submit" aria-label="Create">Create</button>
        </div>
      </form>
    `;

    self.elements.overlay = self.elements.modal.querySelector('.modal-overlay');
    self.elements.modalContainer = self.elements.modal.querySelector('.modal-container');
    self.elements.modalTitle = self.elements.modalContainer.querySelector('.modal__title');
    self.elements.closeBtn = self.elements.modalContainer.querySelector('.modal__close-btn');
    self.elements.resetBtn = self.elements.modalContainer.querySelector('[type=reset]');
    self.elements.submitBtn = self.elements.modalContainer.querySelector('[type=submit]');
  }
}
