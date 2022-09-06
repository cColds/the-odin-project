import './scss/form.scss';

import FormModule from './form.module';
import FormView from './form.view';
import FormController from './form.controller';

export default class Form {
  constructor({ type, id }) {
    const self = this;
    const module = new FormModule({ type, id });
    const view = new FormView(module);
    const controller = new FormController(module, view);

    self.controller = controller;
  }
}
