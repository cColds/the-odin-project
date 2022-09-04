export default class AppController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  toggleSidebar(state) {
    const self = this;

    self.module.toggleSidebar(state);
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.module.events.publish('render', { node, appendType });

    const { sidebarToggle } = self.view.elements;

    sidebarToggle.addEventListener('click', () => self.toggleSidebar(!self.module.sidebarState));
  }
}
