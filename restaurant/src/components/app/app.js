import './scss/app.scss';

import AppModule from './app.module.js';
import AppView from './app.view.js';
import AppController from './app.controller.js';

export default class App {
  constructor(params) {
    const self = this;
    self.module = new AppModule(params);
    self.view = new AppView(self.module);
    self.controller = new AppController(self.module, self.view);
  }
}
