export default class BookView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('updateBook', (data) => self.updateBook(data))
      .subscribe('deleteBook', () => self.deleteBook());
  }

  updateBook(data) {
    const self = this;
    const {
      bookTitle,
      bookAuthor,
      bookPages,
      btnIsRead,
      progressBarLine,
      progressBarStatus,
    } = self.elements;
    const barStatus = Math.floor((100 / data.totalPages) * data.pagesRead);

    bookTitle.textContent = data.title;
    bookAuthor.textContent = data.author;
    bookPages.textContent = `${data.pagesRead} / ${data.totalPages}`;

    btnIsRead.dataset.isRead = data.isRead;

    progressBarLine.style.width = `${barStatus}%`;
    progressBarStatus.textContent = `${barStatus}%`;
  }

  deleteBook() {
    const self = this;
    const { book } = self.elements;

    book.remove();
    self.elements = {};
  }

  render() {
    const self = this;
    const { book } = self.elements;
    const { node, appendMode = 'append', data } = self.module.params;
    const barStatus = Math.floor((100 / data.totalPages) * data.pagesRead);

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!book || !(book instanceof HTMLElement)) {
      self.elements.book = document.createElement('div');
      self.elements.book.className = 'book';

      node[appendMode](self.elements.book);
    } else {
      self.elements.book.innerHTML = '';
    }

    self.elements.book.innerHTML = `
      <header class="book__header">
        <h3 class="book__title">${data.title}</h3>
          <span class="book__author">
            by
            <span class="author">${data.author}
          </span>
        </span>

        <div class="book__control">
          <button class="control control_is-read" type="button" aria-label="Is Read" data-is-read="${data.isRead}">
            <svg class="icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.4444 2.50156C15.7319 2.59875 12.3281 2.9525 10.2269 4.23875C10.0819 4.3275 9.99969 4.48531 9.99969 4.65031V16.0212C9.99969 16.3822 10.3944 16.6103 10.7272 16.4428C12.8891 15.3547 16.0156 15.0578 17.5616 14.9766C18.0894 14.9487 18.4997 14.5256 18.4997 14.0184V3.46093C18.5 2.9075 18.02 2.46906 17.4444 2.50156ZM8.77281 4.23875C6.67188 2.9525 3.26813 2.59906 1.55562 2.50156C0.98 2.46906 0.5 2.9075 0.5 3.46093V14.0187C0.5 14.5262 0.910313 14.9494 1.43813 14.9769C2.98469 15.0581 6.11281 15.3553 8.27469 16.4441C8.60656 16.6112 9 16.3834 9 16.0234V4.64468C9 4.47937 8.91813 4.32781 8.77281 4.23875Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button class="control control_edit" type="button" aria-label="Edit">
            <svg class="icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.0813 4.1L15.9 6.91875C16.0187 7.0375 16.0187 7.23125 15.9 7.35L9.075 14.175L6.175 14.4969C5.7875 14.5406 5.45938 14.2125 5.50313 13.825L5.825 10.925L12.65 4.1C12.7687 3.98125 12.9625 3.98125 13.0813 4.1ZM18.1437 3.38438L16.6187 1.85938C16.1437 1.38438 15.3719 1.38438 14.8938 1.85938L13.7875 2.96563C13.6688 3.08438 13.6688 3.27813 13.7875 3.39688L16.6063 6.21563C16.725 6.33438 16.9188 6.33438 17.0375 6.21563L18.1437 5.10938C18.6187 4.63125 18.6187 3.85938 18.1437 3.38438ZM12.5 12.3188V15.5H2.5V5.5H9.68125C9.78125 5.5 9.875 5.45938 9.94687 5.39063L11.1969 4.14063C11.4344 3.90313 11.2656 3.5 10.9312 3.5H2C1.17188 3.5 0.5 4.17188 0.5 5V16C0.5 16.8281 1.17188 17.5 2 17.5H13C13.8281 17.5 14.5 16.8281 14.5 16V11.0688C14.5 10.7344 14.0969 10.5688 13.8594 10.8031L12.6094 12.0531C12.5406 12.125 12.5 12.2188 12.5 12.3188Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button class="control control_delete" type="button" aria-label="Delete">
            <svg class="icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 14.75C5 15.575 5.675 16.25 6.5 16.25H12.5C13.325 16.25 14 15.575 14 14.75V5.75H5V14.75ZM14.75 3.5H12.125L11.375 2.75H7.625L6.875 3.5H4.25V5H14.75V3.5Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </header>

      <div class="book__progress">
        <span class="book__pages">
          Pages:
          <span class="pages">${data.pagesRead} / ${data.totalPages}</span>
        </span>

        <div class="progress__bar">
          <div class="bar__line">
            <div class="line" style="width: ${barStatus}%"></div>
          </div>
          <span class="bar__status">${barStatus}%</span>
        </div>
      </div>
    `;

    self.elements.bookTitle = self.elements.book.querySelector('.book__title');
    self.elements.bookAuthor = self.elements.book.querySelector('.book__author .author');
    self.elements.bookPages = self.elements.book.querySelector('.book__pages .pages');

    self.elements.btnIsRead = self.elements.book.querySelector('.control_is-read');
    self.elements.btnEdit = self.elements.book.querySelector('.control_edit');
    self.elements.btnDelete = self.elements.book.querySelector('.control_delete');

    self.elements.progressBarLine = self.elements.book.querySelector('.progress__bar .line');
    self.elements.progressBarStatus = self.elements.book.querySelector('.progress__bar .bar__status');

    self.module.events.publish('render');
  }
}
