import MenuModule from './menuModule.js';
import MenuView from './menuView.js';
import MenuController from './menuController.js';

export default class Menu {
  constructor(params) {
    const self = this;
    self.module = new MenuModule(params);
    self.view = new MenuView(self.module);
    self.controller = new MenuController(self.module, self.view);

    self.view.render();
  }
}
