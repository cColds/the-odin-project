import PubSub from '../../libs/pubSub.js';
import data from '../../module/data.js';

export default class AppModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.params = params;
    self.books = [];
  }

  getBooks() {
    const self = this;

    /* eslint-disable arrow-body-style */
    /* eslint-disable quote-props */
    return self.books.map((book) => {
      return {
        'title': book.title,
        'author': book.author,
        'pages-read': book.pagesRead,
        'total-pages': book.totalPages,
        'is-read': book.isRead,
      };
    });
    /* eslint-enable quote-props */
    /* eslint-enable arrow-body-style */
  }

  async loadBooks() {
    const self = this;
    let books = data.getBooks();

    if (!Array.isArray(books) || books.length === 0) {
      books = await data.getDefaultBooks();
    }

    for (let i = 0; i < books.length; i += 1) {
      const book = {
        title: books[i].title,
        author: books[i].author,
        pagesRead: books[i]['pages-read'],
        totalPages: books[i]['total-pages'],
        isRead: books[i]['is-read'],
      };

      self.createBook(book);
    }
  }

  saveBooks() {
    const self = this;

    data.saveBooks(self.getBooks());
  }

  createBook(book) {
    const self = this;

    self.events.publish('createBook', book);

    self.saveBooks();
  }

  deleteBook(book) {
    const self = this;
    const index = self.books.indexOf(book);

    self.books.splice(index, 1);

    self.events.publish('deleteBook', book);

    self.saveBooks();
  }
}
