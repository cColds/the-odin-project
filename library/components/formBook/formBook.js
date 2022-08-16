import FormBookModule from './formBookModule.js';
import FormBookView from './formBookView.js';
import FormBookController from './formBookController.js';

export default class FormBook {
  constructor(params) {
    const self = this;
    self.module = new FormBookModule(params);
    self.view = new FormBookView(self.module);
    self.controller = new FormBookController(self.module, self.view);

    self.view.render();
  }
}
