export default class DropdownView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType, classList }) => self.render({ node, appendType, classList }))
      .subscribe('renderList', (popover) => self.renderList(popover))
      .subscribe('setValue', () => self.update());
  }

  static renderItem(item) {
    return `
      <span class="material-symbols-rounded item__icon">${item.iconType}</span>
      <span class="item__label">${item.title}</span>
    `;
  }

  update() {
    const self = this;
    const { value } = self.module;
    const { dropdown, value: valueElement } = self.elements;

    if (!value) {
      dropdown.classList.add('dropdown_empty');
      valueElement.textContent = 'Select project';
    } else {
      dropdown.classList.remove('dropdown_empty');
      valueElement.innerHTML = DropdownView.renderItem(value);
    }
  }

  renderList(popover) {
    const self = this;
    const { dropdown } = self.elements;
    const { items, selectedId } = self.module;

    self.elements.list = document.createElement('ul');
    self.elements.list.classList.add('dropdown__list');
    self.elements.list.style.width = `${dropdown.getBoundingClientRect().width}px`;

    self.elements.list.innerHTML = `${items.map((item, i) => `
      <li class="list__item${i === selectedId ? ' list__item_selected' : ''}">
        ${DropdownView.renderItem(item)}
      </li>
    `).join('')}`;

    self.elements.listItems = self.elements.list.querySelectorAll('.list__item');

    popover.body.append(self.elements.list);
    popover.show('bottom');
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

    self.elements.dropdown.innerHTML = `
      <div class="dropdown__value"></div>
      <span class="material-symbols-rounded dropdown__icon">expand_more</span>
    `;

    self.elements.value = self.elements.dropdown.querySelector('.dropdown__value');

    self.update();
  }
}
