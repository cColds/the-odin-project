import './scss/dropdown.scss';

import DropdownModule from './dropdown.module';
import DropdownView from './dropdown.view';
import DropdownController from './dropdown.controller';

export default class Dropdown {
  constructor({ items = [], selectedId = null }) {
    const self = this;
    const module = new DropdownModule({ items, selectedId });
    const view = new DropdownView(module);
    const controller = new DropdownController(module, view);

    self.controller = controller;
  }
}
