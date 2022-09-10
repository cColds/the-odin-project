export default class TabController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  setActive(isActive) {
    const self = this;

    self.module.setActive(isActive);
  }

  tabClick() {
    const self = this;
    const { isActive } = self.module;

    if (!isActive) {
      self.setActive(true);
      self.events.publish('tabClick');
    }
  }

  update() {
    const self = this;

    self.events.publish('update');
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.module.events.publish('render', { node, appendType });

    const { tab } = self.view.elements;

    self.update();

    // Listeners
    tab.addEventListener('click', () => self.tabClick());
  }
}
