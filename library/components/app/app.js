import AppModule from './appModule.js';
import AppView from './appView.js';
import AppController from './appController.js';

export default class App {
  constructor(params) {
    const self = this;
    self.module = new AppModule(params);
    self.view = new AppView(self.module);
    self.controller = new AppController(self.module, self.view);

    self.view.render();
  }
}
