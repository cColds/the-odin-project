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

    return self.module.data;
  }

  update() {
    const self = this;

    self.events.publish('update');
  }

  editTodo() {
    const self = this;
    const { isExpired } = self.data;

    if (!isExpired) {
      self.events.publish('editTodo', self.data);
    }
  }

  deleteTodo() {
    const self = this;
    const { id } = self.module.data;

    self.events.publish('deleteTodo', id);
  }

  goToParent() {
    const self = this;
    const { id, projectId } = self.module.data;

    self.events.publish('goToParent', { id, projectId });
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.events.publish('render', { node, appendType });

    const {
      todoCheckboxBtn,
      todoEditBtn,
      todoDeleteBtn,
      todoParentBtn,
    } = self.view.elements;

    // Listeners
    todoCheckboxBtn.addEventListener('click', () => {
      const { isCompleted, isExpired } = self.module.data;

      if (!isExpired) {
        self.editTodo({ isCompleted: !isCompleted });
      }
    });

    todoEditBtn.addEventListener('click', () => self.editTodo());
    todoDeleteBtn.addEventListener('click', () => self.deleteTodo());
    todoParentBtn.addEventListener('click', () => self.goToParent());
  }
}
