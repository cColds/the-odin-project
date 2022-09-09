import Modal from '../../modal/modal';

import Project from '../../../modules/project';
import Todo from '../../../modules/todo';

function AppData() {
  const modalComponent = new Modal().controller;
  const projects = {};
  const todos = {};
  let activeProjectId = null; /* eslint-disable-line no-unused-vars */
  let sidebarState = true; /* eslint-disable-line no-unused-vars */

  return {
    setActiveProjectId(id) {
      if (projects[id]) {
        activeProjectId = id;
      } else {
        throw new Error('Incorrect project id');
      }
    },

    /**
      * @param {boolean} state
    */
    setSidebarState(state) {
      sidebarState = state;
    },

    getModal() {
      return modalComponent;
    },

    getActiveProjectId() {
      return activeProjectId;
    },

    getProject(id) {
      return projects?.[id] || null;
    },

    getProjects() {
      const keys = Object.keys(projects);
      const projectList = keys.map((key) => this.getProject(key));

      return projectList;
    },

    getUserProjects() {
      const projectList = this.getProjects();

      return projectList.filter(({ type }) => type === 'user');
    },

    getTodo(id) {
      return todos?.[id] || null;
    },

    /**
      * @param {function} filter
    */
    getTodos(filter) {
      const keys = Object.keys(todos);
      const todoList = keys.map((key) => this.getTodo(key));

      if (filter) {
        return todoList.filter((todo) => filter(todo));
      }

      return todoList;
    },

    getSidebarState() {
      return sidebarState;
    },

    /**
      * @param {Project} project
    */
    addProject(project) {
      if (!(project instanceof Project)) {
        throw new Error('Incorrect project object');
      }

      const { id } = project;

      if (!projects[id]) {
        projects[id] = {};
      }

      projects[id] = project;
    },

    /**
      * @param {Todo} todo
    */
    addTodo(todo) {
      if (!(todo instanceof Todo)) {
        throw new Error('Incorrect todo object');
      }

      const { id } = todo;

      if (!todos[id]) {
        todos[id] = {};
      }

      todos[id] = todo;
    },

    removeProject(id) {
      if (!projects[id]) {
        throw new Error('Incorrect project id');
      }

      const project = this.getProject(id);
      const projectTodos = this.getTodos(project.filter);

      Object.keys(projectTodos).forEach((key) => {
        const { id: todoId } = projectTodos[key];

        this.removeTodo(todoId);
      });

      delete projects[id];
    },

    removeTodo(id) {
      if (!todos[id]) {
        throw new Error('Incorrect todo id');
      }

      delete todos[id];
    },
  };
}

const appData = new AppData();

export default appData;
