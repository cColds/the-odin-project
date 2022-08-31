export default class AppController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  changePage(pageName) {
    const self = this;

    self.module.changePage(pageName);
  }

  render() {
    const self = this;
    self.module.events.publish('render');

    const { pagesBtn } = self.view.elements;
    const pagesKey = Object.keys(pagesBtn);

    for (let i = 0; i < pagesKey.length; i += 1) {
      const key = pagesKey[i];
      const page = pagesBtn[key];

      page.addEventListener('click', () => self.changePage(key));
    }
  }
}
