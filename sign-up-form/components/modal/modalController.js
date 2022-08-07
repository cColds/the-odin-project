export default class ModalController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender());
  }

  toggleVisible() {
    const self = this;
    const { isVisible } = self.module;

    self.module.toggleVisible(!isVisible);
  }

  onRender() {
    const self = this;
    const { container, modalContainer, modalCloseBtn } = self.view.elements;

    document.addEventListener('animationend', ({ animationName, target }) => {
      if (animationName === 'modal_hidden') {
        target.classList.remove('modal_hidden');
        self.module.events.publish('hidden');
      }
    });

    container.addEventListener('mousedown', () => self.toggleVisible());
    modalContainer.addEventListener('mousedown', (e) => e.stopPropagation());
    modalCloseBtn.addEventListener('click', () => self.toggleVisible());

    return self;
  }
}
