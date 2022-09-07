import Form from '../forms/form';
import defautlProjects from './data/defautlProjects';
import defaultTodo from './data/defaultTodo.json';
import appData from './module/appData';
import storage from '../../modules/storage';

export default class AppController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get modal() {
    const self = this;

    return self.module.modal;
  }

  createTodo({
    id = crypto.randomUUID(),
    title,
    description,
    dueDate = null,
    priority = 0,
    projectId,
    isCompleted = false,
    isExpired = false,
  }) {
    const self = this;
    const todo = self.module.createTodo({
      id, title, description, dueDate, priority, projectId, isCompleted, isExpired,
    });

    todo.events.subscribe('update', () => storage.save('todos', appData.getTodos()));
  }

  createProject({
    id = crypto.randomUUID(),
    name,
    iconType = 'list_alt',
    filter = null,
    type = 'user',
    options: {
      deleted = true,
      edited = true,
      added = true,
      todoParent = false,
    } = {},
  }) {
    const self = this;
    const project = self.module.createProject({
      id,
      name,
      iconType,
      filter,
      type,
      options: {
        deleted, edited, added, todoParent,
      },
    });

    project.events.subscribe('click', () => self.changeProject(id));
  }

  changeProject(projectId) {
    const self = this;

    self.module.changeProject(projectId);

    const { todos } = self.module.projects[projectId];

    todos.forEach((todo) => self.createTodo(todo));
  }

  toggleSidebar(state) {
    const self = this;

    self.module.toggleSidebar(state);
  }

  render({ node, appendType = 'append' }) {
    const self = this;
    self.module.events.publish('render', { node, appendType });

    const { sidebarState } = self.module;
    const { sidebarToggle, createProjectBtn } = self.view.elements;

    self.module.createModal();
    self.toggleSidebar(sidebarState);

    defautlProjects.forEach((project) => self.createProject(project));
    self.changeProject('inbox');

    sidebarToggle.addEventListener('click', () => self.toggleSidebar(!self.module.sidebarState));
    createProjectBtn.addEventListener('click', () => {
      const createProjectFrom = new Form({ type: 'create-project', id: 'modal__form' }).controller;

      self.modal.setContent({
        title: 'Create Project',
        bodyRender: createProjectFrom,
        submit: () => {
          const { values: { title } } = createProjectFrom;

          if (title.trim().length > 3) {
            self.createProject({ name: title });

            storage.save('projects', appData.getUserProjects());
          }

          return true;
        },
      });
      self.modal.open();
    });

    storage.load('projects').then((userProjects) => userProjects.forEach((project) => self.createProject(project)));
    storage.load('todos').then((todos) => {
      if (todos.length === 0) {
        defaultTodo.todos.forEach((todo) => self.createTodo(todo));
      } else {
        todos.forEach((todo) => self.createTodo(todo));
      }
    });
  }
}
