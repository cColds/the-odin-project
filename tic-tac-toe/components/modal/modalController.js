export default class ModalController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender());
  }

  show() {
    const self = this;

    self.module.events.publish('show');
  }

  hide() {
    const self = this;

    self.module.events.publish('hide');
  }

  clear() {
    const self = this;

    self.module.events.publish('clear');
  }

  setTitle(title) {
    const self = this;

    self.module.events.publish('setTitle', title);
  }

  onRender() {
    const self = this;
    const { modal, container, btnClose } = self.view.elements;

    window.addEventListener('animationend', ({ animationName }) => {
      if (animationName === 'modal_hide') {
        self.clear();
      }
    });

    container.addEventListener('mousedown', (e) => e.stopPropagation());

    if (self.module.params.isClose) {
      modal.addEventListener('mousedown', () => self.hide());
      btnClose.addEventListener('click', () => self.hide());
    }
  }
}
