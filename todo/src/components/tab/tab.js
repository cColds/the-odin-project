import './scss/tab.scss';

import TabModule from './tab.module';
import TabView from './tab.view';
import TabController from './tab.controller';

export default class Tab {
  constructor(data) {
    const self = this;
    const module = new TabModule(data);
    const view = new TabView(module);
    const controller = new TabController(module, view);

    self.controller = controller;
  }
}
