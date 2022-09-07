export default class TodoController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  get data() {
    const self = this;

    return {
      id: self.module.id,
      title: self.module.title,
      description: self.module.description,
      dueDate: self.module.dueDate,
      priority: self.module.priority,
      projectId: self.module.projectId,
      isCompleted: self.module.isCompleted,
      isExpired: self.module.isExpired,
    };
  }

  update() {
    const self = this;

    self.events.publish('update');
  }

  toggleComplete(isCompleted) {
    const self = this;

    self.module.toggleComplete(isCompleted);
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.events.publish('render', { node, appendType });

    const {
      checkboxBtn,
    } = self.view.elements;

    checkboxBtn.addEventListener('click', () => self.toggleComplete(!self.module.isCompleted));
  }
}
