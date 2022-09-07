export default class DropdownView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType, classList }) => self.render({ node, appendType, classList }));
  }

  render({ node, appendType, classList }) {
    const self = this;
    const { dropdown } = self.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!dropdown || !(dropdown instanceof HTMLElement)) {
      self.elements.dropdown = document.createElement('div');
      self.elements.dropdown.classList.add(...classList, 'dropdown');

      node[appendType](self.elements.dropdown);
    } else {
      self.elements.dropdown.innerHTML = '';
    }

    self.elements.dropdown.innerHTML = '123123123123';
  }
}
