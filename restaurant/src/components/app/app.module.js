import PubSub from '../../libs/pubSub.js';

export default class AppModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.params = params;
    self.pages = {};
    self.currentPage = {};
  }

  async changePage(pageName) {
    const self = this;
    const prevPage = { ...self.currentPage };

    if (!self.pages[pageName]) {
      const pageRender = await import(`../pages/${pageName}/${pageName}.js`)
        .then(({ default: render }) => render)
        .catch((error) => {
          throw new Error(`Cant't load this page: ${pageName}: ${error}`);
        });

      self.pages[pageName] = pageRender;
    }

    self.currentPage = { name: pageName, render: self.pages[pageName] };

    self.events.publish('changePage', {
      current: self.currentPage,
      prev: prevPage,
    });
  }
}
