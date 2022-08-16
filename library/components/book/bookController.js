import FormBook from '../formBook/formBook.js';
import FormApply from '../formApply/formApply.js';

export default class BookController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender());
  }

  toggleIsRead() {
    const self = this;
    const { data: { isRead } } = self.module.params;

    self.module.toggleIsRead(!isRead);
  }

  editBook() {
    const self = this;
    const { data, modal } = self.module.params;

    (() => new FormBook({
      node: modal.view.elements.content,
      name: 'Edit Book',
      values: {
        'book-title': data.title,
        'book-author': data.author,
        'book-pages-read': data.pagesRead,
        'book-total-pages': data.totalPages,
        'book-is-read': data.isRead,
      },
      callback: (book) => {
        modal.controller.hide();
        self.module.editBook(book);
      },
    }))();

    modal.controller.setTitle('Edit Book');
    modal.controller.show();
  }

  deleteBook() {
    const self = this;
    const { data, modal } = self.module.params;

    (() => new FormApply({
      node: modal.view.elements.content,
      name: 'Delete Book',
      message: `
        Do you really want to delete the book: <span class="message_bolder">${data.title}</span>?
      `,
      type: 'error',
      callback: () => {
        self.module.deleteBook();
        modal.controller.hide();
      },
    }))();

    modal.controller.setTitle(data.title);
    modal.controller.show();
  }

  onRender() {
    const self = this;
    const { btnIsRead, btnEdit, btnDelete } = self.view.elements;

    btnIsRead.addEventListener('click', () => self.toggleIsRead());
    btnEdit.addEventListener('click', () => self.editBook());
    btnDelete.addEventListener('click', () => self.deleteBook());
  }
}
