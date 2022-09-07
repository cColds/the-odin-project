export default {
  projectList: [],
  todosList: [],

  addProject({
    name, iconType, id, type,
  }) {
    this.projectList.push({
      name, iconType, id, type,
    });
  },

  addTodo(todo) {
    this.todosList.push(todo);
  },

  getProjects() {
    return [...this.projectList];
  },

  getUserProjects() {
    return this.projectList.filter(({ type }) => type === 'user');
  },

  getTodos() {
    return [...this.todosList];
  },
};
