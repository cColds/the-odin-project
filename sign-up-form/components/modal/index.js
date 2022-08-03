import ModalModule from './modalModule.js';
import ModalView from './modalView.js';
import ModalController from './modalController.js';

export default class Modal {
  constructor(params) {
    const self = this;
    self.module = new ModalModule(params);
    self.view = new ModalView(self.module);
    self.controller = new ModalController(self.module, self.view);

    self.view.render();

    if (params.isVisible) {
      self.module.toggleVisible(true);
    }
  }
}
