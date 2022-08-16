import BookModule from './bookModule.js';
import BookView from './bookView.js';
import BookController from './bookController.js';

export default class Book {
  constructor(params) {
    const self = this;
    self.module = new BookModule(params);
    self.view = new BookView(self.module);
    self.controller = new BookController(self.module, self.view);

    self.view.render();
  }
}
