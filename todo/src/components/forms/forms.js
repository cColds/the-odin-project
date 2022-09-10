import './scss/form.scss';

import FormsModule from './forms.module';
import FormsView from './forms.view';
import FormsController from './forms.controller';

export default class Forms {
  constructor(options) {
    const self = this;
    const module = new FormsModule(options);
    const view = new FormsView(module);
    const controller = new FormsController(module, view);

    self.controller = controller;
  }
}
