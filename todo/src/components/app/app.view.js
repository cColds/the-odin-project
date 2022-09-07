export default class AppView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('toggleSidebar', (state) => self.toggleSidebar(state))
      .subscribe('createProject', ({ project, type }) => self.createProject({ project, type }))
      .subscribe('changeProject', ({ prevId, activeId }) => self.changeProject({ prevId, activeId }))
      .subscribe('createTodo', (todo) => self.createTodo(todo))
      .subscribe('createModal', (modal) => self.createModal(modal))
      .subscribe('deleteProject', (projectId) => self.removeProject(projectId));
  }

  toggleSidebar(state) {
    const self = this;
    const { app } = self.elements;

    if (state) {
      app.classList.remove('sidebar-hide');
    } else {
      app.classList.add('sidebar-hide');
    }
  }

  createModal(modal) {
    const self = this;
    const { app } = self.elements;

    modal.render({ node: app });
  }

  createTodo(todo) {
    const self = this;
    const { todoList } = self.elements;
    const listItem = document.createElement('li');

    listItem.classList.add('list-item');

    todo.render({ node: listItem });

    todoList.append(listItem);
  }

  loadProject(project) {
    const self = this;
    const { contentBody } = self.elements;
    const { added, deleted, edited } = project.data.options;

    /* eslint-disable indent */
    contentBody.innerHTML = `
      <header class="project__header">
        <span class="material-symbols-rounded project__icon">${project.data.iconType}</span>
        <h2 class="project__title">${project.data.name}</h2>
        <div class="project__controls">
          ${
            added ? `<button id="add-todo-btn" class="btn" type="button" aria-label="Add Todo">
              <span class="material-symbols-rounded project__add-todo-btn">add</span>
            </button>`
            : ''
          }
          ${
            deleted ? `<button id="edit-project-btn" class="btn" type="button" aria-label="Edit Project">
              <span class="material-symbols-rounded project__edit-btn">edit</span>
            </button>`
            : ''
          }
          ${
            edited ? `<button id="delete-project-btn" class="btn btn_critical" type="button" aria-label="Delete Project">
              <span class="material-symbols-rounded project__delete-btn">delete</span>
            </button>`
            : ''
          }
        </div>
      </header>

      <ul class="todo__list"></ul>
    `;

    self.elements.projectTitle = self.elements.contentBody.querySelector('.project__title');
    self.elements.projectHeaderBtn = {
      addBtn: self.elements.contentBody.querySelector('#add-todo-btn'),
      editBtn: self.elements.contentBody.querySelector('#edit-project-btn'),
      deleteBtn: self.elements.contentBody.querySelector('#delete-project-btn'),
    };
    self.elements.todoList = self.elements.contentBody.querySelector('.todo__list');
  }

  changeProject({ prevId, activeId }) {
    const self = this;

    self.module.projects[prevId]?.setActive(false);
    self.module.projects[activeId].setActive(true);

    self.loadProject(self.module.projects[activeId]);
  }

  removeProject(projectId) {
    const self = this;
    const { projects } = self.elements;

    projects[projectId].remove();
  }

  createProject({ project, type }) {
    const self = this;
    const { projectList } = self.elements;
    const listItem = document.createElement('li');

    listItem.classList.add('project-list__item');

    project.render({ node: listItem });

    projectList?.[type].append(listItem);

    if (type === 'user') {
      if (!self.elements.projects) {
        self.elements.projects = {};
      }
      self.elements.projects[project.data.id] = listItem;
    }
  }

  render({ node, appendType }) {
    const self = this;
    const { app } = self.elements;
    // const { sidebarState } = self.module;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!app || !(app instanceof HTMLElement)) {
      self.elements.app = document.createElement('div');
      self.elements.app.classList.add('app');

      node[appendType](self.elements.app);
    } else {
      self.elements.app.innerHTML = '';
    }

    self.elements.app.innerHTML = `
      <aside class="app__sidebar">
        <button class="btn sidebar__toggle" type="button" aria-label="Show Sidebar">
          <span class="material-symbols-rounded btn-icon sidebar__toggle-icon">menu</span>
        </button>

        <div class="sidebar__content">
          <header class="sidebar__header">
            <span class="material-symbols-rounded material-symbols-rounded_fill header-icon">assignment</span>
            <h1 class="header__title">todome</h1>
          </header>

          <div class="sidebar__body">
            <ul id="default-project-list" class="project-list">
            </ul>

            <div class="body-container">
              <div class="body-container__header">
                <h2 class="header__title">projects</h2>

                <button id="create-project" class="btn" type="button" aria-label="Create Project">
                  <span class="material-symbols-rounded btn-icon">add</span>
                </button>
              </div>

              <ul id="user-project-list" class="project-list">
              </ul>
            </div>
          </div>

          <footer class="sidebar__footer">
            <span class="footer__copyright">
              © <a href="http://github.com/vyachnd" target="_blank" rel="noopener">vyachnd</a>, 2022
            </span>
          </footer>
        </div>
      </aside>

      <main class="app__content">
        <div class="content-wrapper"></div>
      </main>
    `;

    self.elements.sidebar = self.elements.app.querySelector('.app__sidebar');
    self.elements.sidebarToggle = self.elements.app.querySelector('.sidebar__toggle');
    self.elements.sidebarBody = self.elements.sidebar.querySelector('.sidebar__body');
    self.elements.contentBody = self.elements.app.querySelector('.app__content .content-wrapper');
    self.elements.projectList = {
      default: self.elements.sidebarBody.querySelector('#default-project-list'),
      user: self.elements.sidebarBody.querySelector('#user-project-list'),
    };
    self.elements.createProjectBtn = self.elements.sidebarBody.querySelector('#create-project');
  }
}
