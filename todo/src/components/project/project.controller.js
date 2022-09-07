export default class ProjectController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get name() {
    const self = this;

    return self.module.name;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  get options() {
    const self = this;

    return self.module.options;
  }

  getTodos() {
    const self = this;

    return self.module.getTodos();
  }

  setActive(state) {
    const self = this;

    self.module.setActive(state);
  }

  click() {
    const self = this;
    const { id, isActive } = self.module;

    if (!isActive) {
      self.module.events.publish('click', { id });
    }
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.module.events.publish('render', { node, appendType });

    const { project } = self.view.elements;

    project.addEventListener('click', () => self.click());
  }
}
