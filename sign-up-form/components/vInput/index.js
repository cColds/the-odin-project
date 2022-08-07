import VInputModule from './vInputModule.js';
import VInputView from './vInputView.js';
import VInputController from './vInputController.js';

export default class VInput {
  constructor(params) {
    const self = this;
    self.module = new VInputModule(params);
    self.view = new VInputView(self.module);
    self.controller = new VInputController(self.module, self.view);

    self.view.render();
  }
}
