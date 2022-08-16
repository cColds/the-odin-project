import Modal from '../modal/modal.js';
import Book from '../book/book.js';

export default class AppeView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('createBook', (book) => self.createBook(book))
      .subscribe('deleteBook', (book) => AppeView.deleteBook(book));
  }

  static deleteBook(book) {
    book.component.module.params.node.remove();
  }

  createBook(book) {
    const self = this;
    const { bookList } = self.elements;
    const { modal } = self.elements;

    const listItem = document.createElement('li');
    listItem.className = 'book-list__item';

    /* eslint-disable no-param-reassign */
    book.component = new Book({
      node: listItem,
      data: book,
      modal,
    });
    book.component.module.events.subscribe('deleteBook', () => self.module.deleteBook(book));
    book.component.module.events.subscribe('updateBook', () => self.module.saveBooks());

    self.module.books.push(book);
    /* eslint-enable no-param-reassign */

    bookList.append(listItem);
  }

  render() {
    const self = this;
    const { app } = self.elements;
    const { node, appendMode = 'append' } = self.module.params;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!app || !(app instanceof HTMLElement)) {
      self.elements.app = document.createElement('div');
      self.elements.app.className = 'app';

      node[appendMode](self.elements.app);
    } else {
      self.elements.app.innerHTML = '';
    }

    self.elements.app.innerHTML = `
      <header class="app__header">
        <div class="wrapper">
          <div class="header__logo">
            <svg class="logo__icon" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 4.5C17 2.01469 14.9853 0 12.5 0C10.0147 0 8 2.01469 8 4.5C8 6.98531 10.0147 9 12.5 9C14.9853 9 17 6.98531 17 4.5ZM11.4495 11.3016C8.66844 9.59906 4.16375 9.13125 1.89687 9.00234C1.13516 8.95922 0.5 9.53953 0.5 10.2722V20.7159C0.5 21.3877 1.04328 21.9478 1.74172 21.9839C3.78828 22.0912 7.92875 22.4845 10.7905 23.9259C11.2297 24.1472 11.7505 23.8458 11.7505 23.3695V11.8387C11.75 11.6198 11.6417 11.4192 11.4495 11.3016ZM23.1031 9.00234C20.8367 9.13078 16.3316 9.59906 13.5509 11.3016C13.3587 11.4192 13.2505 11.6278 13.2505 11.8467V23.3681C13.2505 23.8458 13.7727 24.1477 14.2133 23.9259C17.0745 22.4859 21.2127 22.0927 23.2587 21.9853C23.9572 21.9487 24.5005 21.3886 24.5005 20.7169V10.2722C24.5 9.53953 23.8648 8.95922 23.1031 9.00234Z"
                fill="currentColor"
              />
            </svg>
            <h1 class="logo__title">Library</h1>
          </div>
        </div>
      </header>

      <main class="app__main">
        <div class="wrapper">
          <ul class="book-list"></ul>
        </div>

        <button class="btn-add-book" type="button" aria-label="Add Book">
          <svg class="icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23.75 16.25H16.25V23.75H13.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </main>

      <footer class="app__footer">
        <div class="wrapper">
          <span class="footer__copyright">
            <a class="copyright__link" href="https://github.com/vyachnd" target="_blank" rel="noopener">
              <svg class="icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.96 2.54048H4.77252C3.47858 2.54048 2.42877 3.59029 2.42877 4.88423V22.0717C2.42877 23.3657 3.47858 24.4155 4.77252 24.4155H21.96C23.254 24.4155 24.3038 23.3657 24.3038 22.0717V4.88423C24.3038 3.59029 23.254 2.54048 21.96 2.54048ZM15.9688 21.2758C15.5587 21.3491 15.4073 21.0952 15.4073 20.8852C15.4073 20.6215 15.4171 19.2739 15.4171 18.185C15.4171 17.4233 15.1631 16.9399 14.8653 16.686C16.6719 16.4858 18.5762 16.2368 18.5762 13.1167C18.5762 12.228 18.2589 11.7836 17.7413 11.2124C17.8243 11.0024 18.1026 10.1381 17.6583 9.01509C16.9796 8.80513 15.4268 9.88911 15.4268 9.88911C14.7823 9.70845 14.084 9.61568 13.3956 9.61568C12.7071 9.61568 12.0089 9.70845 11.3643 9.88911C11.3643 9.88911 9.81158 8.80513 9.13287 9.01509C8.68854 10.1333 8.96198 10.9975 9.04987 11.2124C8.53229 11.7836 8.28815 12.228 8.28815 13.1167C8.28815 16.2221 10.1094 16.4858 11.9161 16.686C11.6817 16.896 11.4717 17.2573 11.3985 17.7749C10.9346 17.9848 9.74811 18.3461 9.0401 17.0961C8.59576 16.3247 7.79498 16.2612 7.79498 16.2612C7.00397 16.2514 7.74127 16.7592 7.74127 16.7592C8.26862 17.0034 8.63971 17.9409 8.63971 17.9409C9.11334 19.3911 11.379 18.9028 11.379 18.9028C11.379 19.5815 11.3887 20.685 11.3887 20.8852C11.3887 21.0952 11.2422 21.3491 10.8272 21.2758C7.60455 20.1967 5.34869 17.1303 5.34869 13.5463C5.34869 9.06392 8.77643 5.6606 13.2589 5.6606C17.7413 5.6606 21.3741 9.06392 21.3741 13.5463C21.379 17.1303 19.1915 20.2016 15.9688 21.2758ZM11.1788 18.2924C11.086 18.312 10.9981 18.2729 10.9883 18.2094C10.9786 18.1362 11.0421 18.0727 11.1348 18.0532C11.2276 18.0434 11.3155 18.0825 11.3253 18.146C11.3399 18.2094 11.2764 18.2729 11.1788 18.2924ZM10.7149 18.2485C10.7149 18.312 10.6417 18.3657 10.544 18.3657C10.4366 18.3754 10.3633 18.3217 10.3633 18.2485C10.3633 18.185 10.4366 18.1313 10.5342 18.1313C10.627 18.1215 10.7149 18.1752 10.7149 18.2485ZM10.046 18.1948C10.0264 18.2583 9.92877 18.2876 9.84576 18.2583C9.75299 18.2387 9.68951 18.1655 9.70905 18.102C9.72858 18.0385 9.82623 18.0092 9.90924 18.0288C10.0069 18.0581 10.0704 18.1313 10.046 18.1948ZM9.44537 17.9311C9.40143 17.9848 9.30865 17.9751 9.23541 17.9018C9.16217 17.8383 9.14264 17.7456 9.19147 17.7016C9.23541 17.6479 9.32819 17.6577 9.40143 17.7309C9.4649 17.7944 9.48932 17.892 9.44537 17.9311ZM9.00104 17.4868C8.95709 17.5161 8.87408 17.4868 8.82037 17.4135C8.76666 17.3403 8.76666 17.2573 8.82037 17.2231C8.87408 17.1792 8.95709 17.2133 9.00104 17.2866C9.05475 17.3598 9.05475 17.4477 9.00104 17.4868V17.4868ZM8.68366 17.0131C8.63971 17.0571 8.56647 17.0327 8.51276 16.9838C8.45905 16.9204 8.44928 16.8471 8.49322 16.8129C8.53717 16.769 8.61041 16.7934 8.66412 16.8422C8.71783 16.9057 8.7276 16.979 8.68366 17.0131ZM8.35651 16.6518C8.33698 16.6958 8.2735 16.7055 8.21979 16.6713C8.15631 16.642 8.12701 16.5883 8.14655 16.5444C8.16608 16.5151 8.21979 16.5004 8.28326 16.5249C8.34674 16.559 8.37604 16.6127 8.35651 16.6518Z"
                  fill="currentColor"
                />
              </svg>
              vyachnd
            </a>, 2022
          </span>
        </div>
      </footer>
    `;

    self.elements.main = self.elements.app.querySelector('.app__main .wrapper');
    self.elements.btnAddBook = self.elements.app.querySelector('.btn-add-book');
    self.elements.bookList = self.elements.app.querySelector('.book-list');
    self.elements.modal = new Modal({
      node: self.elements.app,
    });

    self.module.events.publish('render');
  }
}
