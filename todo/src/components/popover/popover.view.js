export default class PopoverView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('show', (position) => self.show(position))
      .subscribe('close', () => self.close());
  }

  show(position) {
    const self = this;
    const { popover } = self.elements;

    const { top, left } = self.module.getPosition({
      type: position,
      body: popover,
    });
    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;

    popover.classList.add('popover_show');
  }

  close() {
    const self = this;
    const { popover } = self.elements;

    popover.classList.add('popover_close');

    const timeout = setTimeout(() => {
      popover.remove();
      clearTimeout(timeout);
    }, 300);
  }

  render({ node, appendType }) {
    const self = this;
    const { popover } = self.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!popover || !(popover instanceof HTMLElement)) {
      self.elements.popover = document.createElement('div');
      self.elements.popover.tabIndex = 0;
      self.elements.popover.classList.add('popover');

      node[appendType](self.elements.popover);
    } else {
      self.elements.popover.innerHTML = '';
    }
  }
}
