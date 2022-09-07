export default {
  projectList: {},
  todosList: {},
  activeProjectId: null,

  setActiveProjectId(projectId) {
    this.activeProjectId = projectId;
  },

  addProject(project) {
    const { id } = project.data;

    if (!this.projectList[id]) {
      this.projectList[id] = project;
    }
  },

  addTodo(todo) {
    const { id } = todo.data;

    if (!this.todosList[id]) {
      this.todosList[id] = todo;
    }
  },

  getActiveProjectId() {
    return this.activeProjectId;
  },

  getProjects() {
    const keys = Object.keys(this.projectList);

    return keys.map((key) => this.projectList[key].data);
  },

  getProject(projectId) {
    return this.projectList[projectId].data;
  },

  getUserProjects() {
    const projectList = this.getProjects();

    return projectList.filter(({ type }) => type === 'user') || [];
  },

  getTodos() {
    const keys = Object.keys(this.todosList);

    return keys.map((key) => this.todosList[key].data);
  },
};
