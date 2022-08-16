import PubSub from '../../libs/pubSub.js';

export default class BookModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.params = params;
  }

  toggleIsRead(state) {
    const self = this;

    self.params.data.isRead = state;

    if (state) {
      self.params.data.pagesRead = self.params.data.totalPages;
    } else {
      self.params.data.pagesRead = 0;
    }

    self.events.publish('updateBook', self.params.data);
  }

  editBook(data) {
    const self = this;

    Object.assign(self.params.data, data);

    if (self.params.data.pagesRead > self.params.data.totalPages) {
      self.params.data.pagesRead = self.params.data.totalPages;
    }

    self.events.publish('updateBook', self.params.data);
  }

  deleteBook() {
    const self = this;

    self.events.publish('deleteBook');
  }
}
