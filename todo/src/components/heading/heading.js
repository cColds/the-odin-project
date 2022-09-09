import './scss/heading.scss';

import HeadingModule from './heading.module';
import HeadingView from './heading.view';
import HeadingController from './heading.controller';

export default class Heading {
  constructor(data = {}) {
    const self = this;
    const module = new HeadingModule(data);
    const view = new HeadingView(module);
    const controller = new HeadingController(module, view);

    self.controller = controller;
  }
}
