import FormBook from '../formBook/formBook.js';

export default class AppController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender());
  }

  addBook() {
    const self = this;
    const { modal } = self.view.elements;

    (() => new FormBook({
      node: modal.view.elements.content,
      name: 'Add Book',
      callback: (book) => {
        modal.controller.hide();
        self.module.createBook(book);
        self.module.saveBooks();
      },
    }))();

    modal.controller.setTitle('Add Book');
    modal.controller.show();
  }

  onRender() {
    const self = this;
    const { btnAddBook } = self.view.elements;

    btnAddBook.addEventListener('click', () => self.addBook());

    self.module.loadBooks();
  }
}
