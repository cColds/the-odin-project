import Popover from '../popover/popover';

export default class DropdownController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  get value() {
    const self = this;

    return self.module.value;
  }

  setValue(index) {
    const self = this;

    self.module.setValue(index);
  }

  renderList() {
    const self = this;
    const { dropdown } = self.view.elements;
    const popover = new Popover({ parent: dropdown }).controller;

    popover.render({ node: document.body });
    self.events.publish('renderList', popover);

    const { selectedId } = self.module;
    const { listItems } = self.view.elements;

    listItems.forEach((listItem, i) => {
      listItem.addEventListener('click', () => {
        if (i !== selectedId) {
          self.setValue(i);
        }
      });
    });

    self.events.subscribe('setValue', () => popover.close());
  }

  render({ node, appendType = 'append', classList = [] }) {
    const self = this;

    self.events.publish('render', { node, appendType, classList });

    const { dropdown } = self.view.elements;

    dropdown.addEventListener('click', () => self.renderList());
  }
}
