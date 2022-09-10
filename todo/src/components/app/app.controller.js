import Project from '../../modules/project';
import Todo from '../../modules/todo';

import defautlProjects from './data/defautlProjects';
import getTestTodos from './data/testTodos';
import appData from './modules/app.data';
import storage from '../../modules/storage';

import Modal from '../modal/modal';
import Forms from '../forms/forms';
import testProjects from './data/testProjects';

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

    self.module.editTodo(id, todoData);
    self.updateTabs();
    self.createTodos(appData.activeProjectId);

    storage.save('todos', appData.getTodos());
  }

  createTodo(todo, projectId) {
    const self = this;
    const { activeProjectId } = self.data;

    if (activeProjectId === projectId) {
      self.events.publish('createTodo', todo);

      const { todos: components } = self.view.components;

      // Events
      components[todo.id].events
        .subscribe('editTodo', (todoObj) => self.formEditTodo(todoObj))
        .subscribe('deleteTodo', (id) => self.formRemoveTodo(id))
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

  editProject(id, projectData) {
    const self = this;
    const project = self.data.getProject(id);

    if (project) {
      project.setData(projectData);
    }

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

  formCreateProject() {
    const self = this;
    const options = {
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
    };

    self.modalForm(options);
  }

  formEditProject(id, heading = null) {
    const self = this;
    const { title: projectTitle } = self.data.getProject(id);
    const options = {
      modalOpt: {
        title: 'Edit Project',
        open: true,
      },

      formOpt: {
        type: 'create-project',
        values: {
          projectTitle,
        },
        submit: {
          title: 'Edit',
          callback: ({ title }) => {
            self.editProject(id, { title });
            heading?.update();
          },
        },
      },
    };

    self.modalForm(options);
  }

  formRemoveProject(id, heading = null) {
    const self = this;
    const { title: projectTitle } = self.data.getProject(id);
    const options = {
      modalOpt: {
        title: 'Remove Project',
        open: true,
      },

      formOpt: {
        type: 'message',
        message: `Are you sure you want to delete the project\n<strong class="message_bold">${projectTitle}</strong>`,
        submit: {
          type: 'critical',
          title: 'Remove',
          callback: () => {
            self.removeProject(id);
            heading?.update();
          },
        },
      },
    };

    self.modalForm(options);
  }

  formCreateTodo(projectId) {
    const self = this;
    const project = self.data.getProject(projectId);
    const { options: { added } } = project;

    if (added) {
      const options = {
        modalOpt: {
          title: 'Create Todo',
          open: true,
        },

        formOpt: {
          type: 'create-todo',
          submit: {
            title: 'Create',
            callback: (todoData) => {
              const todo = self.loadTodo(todoData);
              self.updateTabs();
              self.createTodo(todo, todoData.projectId);

              storage.save('todos', appData.getTodos());
            },
          },
        },
      };

      self.modalForm(options);
    }
  }

  formEditTodo(todo) {
    const self = this;

    const options = {
      modalOpt: {
        title: 'Edit Todo',
        open: true,
      },

      formOpt: {
        type: 'create-todo',
        values: {
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          dueDate: todo.dueDate,
          project: appData.getProject(todo.projectId),
        },
        submit: {
          title: 'Edit',
          callback: (todoData) => self.editTodo(todo.id, todoData),
        },
      },
    };

    self.modalForm(options);
  }

  formRemoveTodo(id) {
    const self = this;
    const { title: todoTitle } = self.data.getTodo(id);
    const options = {
      modalOpt: {
        title: 'Remove Todo',
        open: true,
      },

      formOpt: {
        type: 'message',
        message: `Are you sure you want to delete the todo\n<strong class="message_bold">${todoTitle}</strong>`,
        submit: {
          type: 'critical',
          title: 'Remove',
          callback: () => self.deletTodo(id),
        },
      },
    };

    self.modalForm(options);
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
      const userProjects = projects.length === 0 ? testProjects : projects;

      userProjects.forEach((projectData) => self.createTab(projectData));

      if (projects.length === 0) {
        storage.save('projects', appData.getUserProjects());
      }
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
    tabCreateBtn.addEventListener('click', () => self.formCreateProject());

    window.addEventListener('animationend', ({ animationName, target }) => {
      target.classList.remove(animationName);
    });

    // Events
    heading.events.subscribe('createTodo', (id) => self.formCreateTodo(id));
    heading.events.subscribe('editProject', (id) => self.formEditProject(id, heading));
    heading.events.subscribe('removeProject', (id) => self.formRemoveProject(id, heading));
  }
}
