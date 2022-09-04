export default class AppView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('toggleSidebar', (state) => self.toggleSidebar(state));
  }

  toggleSidebar(state) {
    const self = this;
    const { app } = self.elements;

    if (state) {
      app.classList.remove('sidebar-hide');
    } else {
      app.classList.add('sidebar-hide');
    }
  }

  render({ node, appendType }) {
    const self = this;
    const { app } = self.elements;
    const { sidebarState } = self.module;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!app || !(app instanceof HTMLElement)) {
      self.elements.app = document.createElement('div');
      self.elements.app.classList.add('app');

      node[appendType](self.elements.app);
    } else {
      self.elements.app.innerHTML = '';
    }

    self.elements.app.innerHTML = `
      <aside class="app__sidebar">
        <button class="sidebar__toggle btn" type="button" aria-label="Show Sidebar">
          <span class="material-symbols-rounded btn-icon sidebar__toggle-icon">menu</span>
        </button>

        <div class="sidebar__content">
          <header class="sidebar__header">
            <span class="material-symbols-rounded material-symbols-rounded_fill header-icon">assignment</span>
            <h1 class="header__title">todome</h1>
          </header>

          <div class="sidebar__body">
          </div>

          <footer class="sidebar__footer">
            <span class="footer__copyright">
              © <a href="http://github.com/vyachnd" target="_blank" rel="noopener">vyachnd</a>, 2022
            </span>
          </footer>
        </div>
      </aside>

      <main class="app__content">
        <div class="content-wrapper"></div>
      </main>
    `;

    self.elements.sidebar = self.elements.app.querySelector('.app__sidebar');
    self.elements.sidebarToggle = self.elements.app.querySelector('.sidebar__toggle');
    self.elements.sidebarBody = self.elements.sidebar.querySelector('.sidebar__body');
    self.elements.contentBody = self.elements.app.querySelector('.app__content .content-wrapper');

    if (!sidebarState) {
      self.toggleSidebar(sidebarState);
    }
  }
}
