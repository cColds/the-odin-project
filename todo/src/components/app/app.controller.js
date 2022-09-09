import Project from '../../modules/project';
import Todo from '../../modules/todo';

import defautlProjects from './data/defautlProjects';
import getTestTodos from './data/testTodos';
import appData from './modules/app.data';
import storage from '../../modules/storage';

const WORDS = [
  'Luctus', 'Vel', 'Augue', 'Maecenas', 'Aptent', 'Sollicitudin', 'Amet',
  'Amet', 'Integer', 'Sapien', 'Curabitur', 'Proin', 'Dapibus', 'Eros',
  'Vestibulum', 'Tempus', 'Curae', 'Etiam', 'Curae', 'Etiam', 'Sit', 'Egestas',
  'Vehicula', 'Lorem', 'Porttitor', 'Nostra', 'Ornare', 'Conubia', 'Rutrum', 'Erat',
  'Potenti', 'Accumsan', 'Torquent', 'Sit', 'Vivamus', 'Pharetra', 'Placerat', 'Vel',
  'Non', 'Suscipit', 'Fusce', 'Quisque', 'Fusce', 'Odio', 'Tempus', 'Integer', 'Fringilla',
  'Massa', 'Quisque', 'Consectetur', 'Magna', 'A', 'Sapien', 'Fusce', 'Cursus', 'Dui', 'Odio',
  'Malesuada', 'Taciti', 'Placerat', 'Felis', 'Tempor', 'Quis', 'Per', 'Egestas', 'Semper',
  'Convallis', 'Molestie', 'Enim', 'Eros', 'Inceptos', 'Dictum', 'Venenatis', 'Hendrerit', 'Risus',
  'Est', 'Porttitor', 'Nullam', 'Commodo', 'Feugiat', 'Etiam', 'Porta', 'Vulputate', 'Blandit',
  'Molestie', 'Hendrerit', 'Feugiat', 'Eu', 'Sodales', 'Eleifend', 'Inceptos', 'Cubilia', 'Luctus',
  'Nunc', 'Amet', 'Mattis', 'Lacinia', 'Quisque', 'Erat', 'Erat', 'Porta', 'Ultricies', 'Faucibus',
  'Pretium', 'Enim', 'Tortor', 'Libero', 'Condimentum', 'Rutrum', 'Vulputate', 'Aliquam',
  'Ullamcorper', 'Dictumst', 'Lobortis', 'Lobortis', 'Nullam', 'Aliquet', 'Nunc', 'Convallis',
  'Massa', 'In', 'Vehicula', 'Nam', 'Volutpat', 'Sapien', 'Aenean', 'Nisi', 'Tempus', 'Sit',
  'Integer', 'Diam', 'Pharetra', 'Mattis', 'Per', 'Fermentum', 'Fusce', 'Laoreet', 'Quisque',
  'Eget', 'Id', 'Vel', 'Lectus', 'Nisl', 'Tempus', 'Tellus', 'In', 'Conubia', 'Inceptos', 'Erat',
  'Senectus', 'Bibendum', 'Duis', 'Maecenas', 'Eu', 'Gravida', 'Porttitor', 'Nulla', 'Pellentesque',
  'Malesuada', 'Lobortis', 'Sollicitudin', 'Sapien', 'Etiam', 'Tincidunt', 'Mi', 'Sodales',
  'Bibendum', 'Taciti', 'Morbi', 'Lorem', 'Elementum', 'Vitae', 'Sociosqu', 'Suscipit', 'Consequat',
  'Sem', 'Felis', 'Etiam', 'Adipiscing', 'Tempor', 'Tristique', 'Vivamus', 'Quisque', 'Libero',
  'Sit', 'Consectetur', 'Potenti', 'Primis', 'Netus', 'Ultrices', 'Blandit', 'Ut', 'Nisi', 'Ornare',
  'Id', 'Nostra', 'Sodales', 'Lacinia', 'Egestas', 'Rutrum', 'Libero', 'Proin', 'Sodales',
  'Habitant', 'Cras', 'Tristique', 'Auctor', 'Eget', 'Ipsum', 'Tortor', 'Mauris', 'Faucibus',
  'Auctor', 'Massa', 'Vulputate', 'Tincidunt', 'Placerat', 'In', 'Quisque', 'Aenean', 'Cubilia',
  'Bibendum', 'Lobortis', 'Sagittis', 'Nibh', 'Auctor', 'Conubia', 'Enim', 'Platea', 'Tristique',
  'Fusce', 'Arcu', 'Ante', 'Ultrices', 'Quisque', 'Nostra', 'Sociosqu', 'Erat', 'Enim', 'Molestie',
  'Arcu', 'Nullam', 'Taciti', 'Massa', 'Tortor', 'Ultricies', 'Amet', 'Himenaeos', 'Accumsan',
  'Senectus', 'Imperdiet', 'Donec', 'Auctor', 'Libero', 'Varius', 'Quisque', 'Cras', 'Senectus',
  'Amet', 'Tempus', 'Class', 'Luctus', 'Sollicitudin', 'Amet', 'Aenean', 'Etiam', 'Curabitur',
  'Condimentum', 'Fames', 'Vitae', 'Taciti', 'Dictumst', 'Convallis', 'Vehicula', 'Libero',
  'Consequat', 'Interdum', 'Malesuada', 'Eu', 'Sit', 'Etiam', 'Integer', 'Ad', 'Senectus', 'Dui',
  'A', 'Sit', 'Sed', 'Amet', 'Ante', 'Donec', 'Aenean', 'Luctus', 'Sed', 'Interdum', 'Commodo',
  'Molestie', 'Vivamus', 'Per', 'Facilisis', 'Viverra', 'Lobortis', 'Curabitur', 'Nisl', 'Lectus',
  'Leo', 'Nec', 'Elit', 'Suspendisse', 'Odio', 'Praesent', 'Ante', 'Aenean', 'Aliquet', 'Porttitor',
  'Nulla', 'Conubia', 'Egestas', 'Euismod', 'Tempus', 'Lorem', 'Vivamus', 'Tortor', 'Torquent',
  'Mauris', 'Ultrices', 'Auctor', 'Erat', 'Nisl', 'Libero', 'Varius', 'Augue', 'Mauris',
  'Habitasse', 'Convallis', 'Non', 'Sapien', 'Curabitur', 'Lobortis', 'Etiam', 'Inceptos', 'In',
  'Nec', 'Turpis', 'Aptent', 'Dictumst', 'Est', 'Vehicula', 'Nec', 'Lacinia', 'Rhoncus', 'Proin',
  'Varius', 'Duis', 'Blandit', 'Vestibulum', 'Scelerisque', 'Egestas', 'Mi', 'Tellus', 'Quisque',
];

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

  goToTodo(id) {
    const self = this;

    self.events.publish('goToTodo', id);
  }

  deletTodo(id) {
    const self = this;

    self.module.deleteTodo(id);
    self.updateTabs();

    storage.save('todos', appData.getTodos());
  }

  createTodo(todo, projectId) {
    const self = this;
    const activeProjectId = self.data.getActiveProjectId();

    if (activeProjectId === projectId) {
      self.events.publish('createTodo', todo);

      const { todos: components } = self.view.components;

      // Events
      components[todo.id].events.subscribe('update', () => {
        storage.save('todos', appData.getTodos());
        self.updateTabs();
      });

      components[todo.id].events.subscribe('deleteTodo', (id) => self.deletTodo(id));
      components[todo.id].events.subscribe('goToParent', ({ id, projectId: parentId }) => {
        const currentProjectId = self.data.getActiveProjectId();

        if (currentProjectId !== parentId) {
          self.changeTab(parentId);
        }
        self.goToTodo(id);
      });
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
      self.data.setActiveProjectId(project.id);
      self.changeTab(project.id);
    }

    return project;
  }

  removeProject(projectId) {
    const self = this;

    self.module.removeProject(projectId);
  }

  render({ node, appendType = 'append' }) {
    const self = this;
    self.module.events.publish('render', { node, appendType });

    // Elements
    const {
      app,
      sidebarToggle,
      tabCreateBtn,
    } = self.view.elements;
    const { heading } = self.view.components;

    // Sidebar
    const { data } = self.module;

    self.toggleSidebar(data.getSidebarState());

    // Modal
    data.getModal().render({
      node: app,
    });

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
      self.createTodos(appData.getActiveProjectId());

      if (res.length === 0) {
        storage.save('todos', appData.getTodos());
      }
    });

    // Listeners
    sidebarToggle.addEventListener('click', () => self.toggleSidebar(!data.getSidebarState()));
    tabCreateBtn.addEventListener('click', () => {
      const projectData = {
        title: WORDS[Math.floor(Math.random() * WORDS.length)],
        type: 'user',
      };

      const project = self.createTab(projectData);
      self.changeTab(project.id);

      storage.save('projects', appData.getUserProjects());
    });

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
    heading.events.subscribe('editData', () => {
      self.updateTabs();
      storage.save('projects', appData.getUserProjects());
    });
    heading.events.subscribe('removeProject', (id) => {
      self.removeProject(id);
      self.updateTabs();

      if (id !== 'inbox') {
        self.changeTab('inbox');
      }

      storage.save('projects', appData.getUserProjects());
      storage.save('todos', appData.getTodos());
    });
  }
}

/*

function deleteProject(projectId) {
  const self = this;

  self.module.deleteProject(projectId);
}

function createProjectForm({ title, callback, placeholder }) {
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

function createMessageForm({ title, callback, message }) {
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

function changeProject(projectId) {
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
        self.deleteProject(projectId);
      },
      message: `
        Do you really want to delete the project <strong>${projects[projectId].data.name}</strong>
      `,
    }));
  }
}
*/
