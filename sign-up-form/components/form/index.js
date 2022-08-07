import FormModule from './formModule.js';
import FormView from './formView.js';
import FormController from './formController.js';

export default class VInput {
  constructor(params) {
    const self = this;
    self.module = new FormModule(params);
    self.view = new FormView(self.module);
    self.controller = new FormController(self.module, self.view);

    self.view.render();
  }
}
