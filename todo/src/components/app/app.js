import './scss/app.scss';

import AppModule from './app.module';
import AppView from './app.view';
import AppController from './app.controller';

export default class App {
  constructor() {
    const self = this;
    const module = new AppModule();
    const view = new AppView(module);
    const controller = new AppController(module, view);

    self.controller = controller;
  }
}
