import './scss/modal.scss';

import ModalModule from './modal.module';
import ModalView from './modal.view';
import ModalController from './modal.controller';

export default class Modal {
  constructor(options = {}) {
    const self = this;
    const module = new ModalModule(options);
    const view = new ModalView(module);
    const controller = new ModalController(module, view);

    self.controller = controller;
  }
}
