export default class AppView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('render', () => self.render())
      .subscribe('changePage', ({ current, prev }) => self.changePage(current, prev));
  }

  changePage(current, prev) {
    const self = this;
    const { header, main, pagesBtn } = self.elements;

    if (current.render) {
      const pageContent = current.render();

      if (current.name !== 'home') {
        header.classList.add('app__header-no-opacity');
      } else {
        header.classList.remove('app__header-no-opacity');
      }

      if (prev.name) {
        pagesBtn[prev.name].classList.remove('nav__btn-active');
      }

      pagesBtn[current.name].classList.add('nav__btn-active');

      main.innerHTML = '';
      main.append(pageContent);
    }
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
            <span class="logo__text">logotype</span>
          </div>

          <nav class="header__nav">
            <ul class="nav__list">
              <li class="list__item">
                <button class="nav__btn" type="button" aria-label="Home">home</button>
              </li>
              <li class="list__item">
                <button class="nav__btn" type="button" aria-label="Menu">menu</button>
              </li>
            </ul>
          </nav>

          <a class="author" href="https://github.com/vyachnd" target="_blank" rel="noopener">vyachnd</a>
        </div>
      </header>

      <main class="app__main"></main>
    `;

    self.elements.header = self.elements.app.querySelector('.app__header');
    const [home, menu] = self.elements.header.querySelectorAll('.nav__btn');
    self.elements.pagesBtn = { home, menu };
    self.elements.main = self.elements.app.querySelector('.app__main');
  }
}
