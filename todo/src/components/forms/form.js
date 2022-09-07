import './scss/form.scss';

import FormModule from './form.module';
import FormView from './form.view';
import FormController from './form.controller';

export default class Form {
  constructor(options) {
    const self = this;
    const module = new FormModule(options);
    const view = new FormView(module);
    const controller = new FormController(module, view);

    self.controller = controller;
  }
}
