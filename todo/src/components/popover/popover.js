import './scss/popover.scss';

import PopoverModule from './popover.module';
import PopoverView from './popover.view';
import PopoverController from './popover.controller';

export default class Popover {
  constructor({ parent }) {
    const self = this;
    const module = new PopoverModule({ parent });
    const view = new PopoverView(module);
    const controller = new PopoverController(module, view);

    self.controller = controller;
  }
}
