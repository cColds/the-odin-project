export default class ProjectController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  get todos() {
    const self = this;

    return self.module.getTodos();
  }

  get data() {
    const self = this;

    return {
      name: self.module.name,
      iconType: self.module.iconType,
      id: self.module.id,
      filter: self.module.filter,
      type: self.module.type,
      options: self.module.options,
    };
  }

  update() {
    const self = this;

    self.events.publish('update');
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
