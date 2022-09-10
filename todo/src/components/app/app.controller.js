import Project from '../../modules/project';
import Todo from '../../modules/todo';

import defautlProjects from './data/defautlProjects';
import getTestTodos from './data/testTodos';
import appData from './modules/app.data';
import storage from '../../modules/storage';

import Modal from '../modal/modal';
import Forms from '../forms/forms';

export default class AppController {
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

  toggleSidebar(state) {
    const self = this;

    self.module.toggleSidebar(state);
  }

  goToTodo(projectId, id) {
    const self = this;
    const currentProjectId = self.data.activeProjectId;

    if (currentProjectId !== projectId) {
      self.changeTab(projectId);
    }

    self.events.publish('goToTodo', id);
  }

  deletTodo(id) {
    const self = this;

    self.module.deleteTodo(id);
    self.updateTabs();

    storage.save('todos', appData.getTodos());
  }

  editTodo(id, todoData) {
    const self = this;

    self.updateTabs();

    storage.save('todos', appData.getTodos());

    return todoData;
  }

  createTodo(todo, projectId) {
    const self = this;
    const { activeProjectId } = self.data;

    if (activeProjectId === projectId) {
      self.events.publish('createTodo', todo);

      const { todos: components } = self.view.components;

      // Events
      components[todo.id].events
        .subscribe('editTodo', (todoData) => self.editTodo(todo.id, todoData))
        .subscribe('deleteTodo', (id) => self.deletTodo(id))
        .subscribe('goToParent', ({ projectId: parentId, id }) => self.goToTodo(parentId, id));
    }
  }

  createTodos(projectId) {
    const self = this;
    const project = appData.getProject(projectId);
    const todos = appData.getTodos(project.filter);

    self.events.publish('removeTodos');

    todos.forEach((todo) => self.createTodo(todo, projectId));
  }

  loadTodo(todoData) {
    const self = this;
    const todo = new Todo(todoData);

    self.module.loadTodo(todo);

    return todo;
  }

  updateTabs() {
    const self = this;

    self.module.updateTabs();
  }

  changeTab(projectId) {
    const self = this;
    const { heading } = self.view.components;

    heading.setData(appData.getProject(projectId));

    self.module.changeTab(projectId);

    self.createTodos(projectId);
  }

  createTab(projectData) {
    const self = this;
    const project = new Project(projectData);

    self.module.createTab(project);

    const { tabs } = self.view.components;

    // Events
    tabs[project.id].events.subscribe('tabClick', () => self.changeTab(project.id));

    if (projectData.isActive) {
      self.data.activeProjectId = project.id;
      self.changeTab(project.id);
    }

    return project;
  }

  editProject(projectData) {
    const self = this;

    self.module.editProject(projectData);

    self.updateTabs();
    storage.save('projects', appData.getUserProjects());
  }

  removeProject(projectId) {
    const self = this;

    self.module.removeProject(projectId);

    self.updateTabs();

    if (projectId !== 'inbox') {
      self.changeTab('inbox');
    }
  }

  modalForm({ modalOpt, formOpt }) {
    const self = this;
    const { app } = self.view.elements;

    const modal = new Modal(modalOpt).controller;
    const forms = new Forms(formOpt).controller;

    modal.render({ node: app });
    forms.render({ node: modal.body });

    forms.events
      .subscribe('reset', () => modal.close())
      .subscribe('submit', () => modal.close());
  }

  render({ node, appendType = 'append' }) {
    const self = this;
    self.module.events.publish('render', { node, appendType });

    // Elements
    const {
      sidebarToggle,
      tabCreateBtn,
    } = self.view.elements;
    const { heading } = self.view.components;

    // Sidebar
    const { data } = self.module;

    data.app = this;
    self.toggleSidebar(data.isSidebarShown);

    // Load Default Projects
    defautlProjects.forEach((projectData) => {
      self.createTab(projectData);
    });

    // Load Local Storage
    storage.load('projects').then((projects) => {
      projects.forEach((projectData) => self.createTab(projectData));
    });

    storage.load('todos').then((res) => {
      const todos = res.length === 0 ? getTestTodos() : res;

      todos.forEach((todoData) => self.loadTodo(todoData));

      self.updateTabs();
      self.createTodos(appData.activeProjectId);

      if (res.length === 0) {
        storage.save('todos', appData.getTodos());
      }
    });

    // Listeners
    sidebarToggle.addEventListener('click', () => self.toggleSidebar(!data.isSidebarShown));
    tabCreateBtn.addEventListener('click', () => self.modalForm({
      modalOpt: {
        title: 'Create Project',
        open: true,
      },

      formOpt: {
        type: 'create-project',
        submit: {
          title: 'Create',
          callback: ({ title }) => {
            const project = self.createTab({ title });
            self.changeTab(project.id);
            storage.save('projects', appData.getUserProjects());
          },
        },
      },
    }));

    window.addEventListener('animationend', ({ animationName, target }) => {
      target.classList.remove(animationName);
    });

    // Events
    heading.events.subscribe('createTodo', (todoData) => {
      const todo = self.loadTodo(Object.assign(todoData));
      self.updateTabs();
      self.createTodo(todo, todoData.projectId);

      storage.save('todos', appData.getTodos());
    });
    heading.events.subscribe('editData', (projectData) => self.editProject(projectData));
    heading.events.subscribe('removeProject', (projectId) => self.removeProject(projectId));
  }
}
