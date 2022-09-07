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

  toggleSidebar(state) {
    const self = this;

    self.module.toggleSidebar(state);
  }

  deleteProject(projectId) {
    const self = this;

    self.module.deleteProject(projectId);
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

  createProjectForm({ title, callback, placeholder }) {
    const self = this;
    const createProjectFrom = new Form({
      type: 'create-project',
      id: 'modal__form',
      placeholder,
    }).controller;

    self.modal.setContent({
      title,
      bodyRender: createProjectFrom,
      submit: () => {
        const { values } = createProjectFrom;

        callback(values);

        return true;
      },
    });
    self.modal.open();
  }

  createMessageForm({ title, callback, message }) {
    const self = this;
    const createProjectFrom = new Form({
      id: 'modal__form',
      message,
    }).controller;

    self.modal.setContent({
      title,
      bodyRender: createProjectFrom,
      isCritical: true,
      submit: () => {
        callback();

        return true;
      },
    });
    self.modal.open();
  }

  changeProject(projectId) {
    const self = this;

    self.module.changeProject(projectId);

    const { projects } = self.module;
    const { todos } = projects[projectId];

    todos.forEach((todo) => self.createTodo(todo));

    const { projectTitle, projectHeaderBtn: { addBtn, editBtn, deleteBtn } } = self.view.elements;

    if (addBtn) {
      addBtn.addEventListener('click', () => console.log('add todo'));
    }

    if (editBtn) {
      editBtn.addEventListener('click', () => self.createProjectForm({
        title: 'Edit Project',
        callback: ({ name }) => {
          if (name.trim().length > 3) {
            projects[projectId].name = name;
            projectTitle.textContent = name;

            storage.save('projects', appData.getUserProjects());
          }
        },
        placeholder: {
          name: projects[projectId].data.name,
        },
      }));
    }

    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => self.createMessageForm({
        title: 'Delete Project',
        callback: () => {
          self.changeProject('inbox');
          self.deleteProject(projectId);
        },
        message: `Do you really want to delete the project <strong>${projects[projectId].data.name}</strong>`,
      }));
    }
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
    createProjectBtn.addEventListener('click', () => self.createProjectForm({
      title: 'Create Project',
      callback: ({ name }) => {
        if (name.trim().length > 3) {
          self.createProject({ name });

          storage.save('projects', appData.getUserProjects());
        }
      },
    }));

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
