export default class PopoverController {
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

    return self.view.elements.popover;
  }

  outsideClick({ target }) {
    const self = this;
    const { popover } = self.view.elements;
    const element = target.closest(`.${popover.classList[0]}`);

    if (!element) {
      document.removeEventListener('mouseup', self.bindedOutsideClick);
      self.close();
    }
  }

  show(position = 'bottom') {
    const self = this;

    self.bindedOutsideClick = self.outsideClick.bind(this);
    document.addEventListener('mouseup', self.bindedOutsideClick);

    self.module.show(position);
  }

  close() {
    const self = this;

    self.events.publish('close');
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.events.publish('render', { node, appendType });
  }
}
