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

  editTodo(todoData) {
    const self = this;
    const { isExpired } = self.data;

    if (!isExpired) {
      self.module.editTodo(todoData);
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
    self.update();

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

    todoEditBtn.addEventListener('click', () => {
      import('../app/data/testTodos').then(({ default: getTestTodos }) => {
        const todos = getTestTodos();
        const rndId = Math.floor(Math.random() * todos.length);
        const {
          title,
          description,
          dueDate,
          priority,
          isCompleted,
        } = todos[rndId];

        self.editTodo({
          title, description, dueDate, priority, isCompleted,
        });
      });
    });

    todoDeleteBtn.addEventListener('click', () => self.deleteTodo());

    todoParentBtn.addEventListener('click', () => self.goToParent());
  }
}
