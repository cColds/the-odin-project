import FormApplyModule from './formApplyModule.js';
import FormApplyView from './formApplyView.js';
import FormApplyController from './formApplyController.js';

export default class Modal {
  constructor(params) {
    const self = this;
    self.module = new FormApplyModule(params);
    self.view = new FormApplyView(self.module);
    self.controller = new FormApplyController(self.module, self.view);

    self.view.render();
  }
}
