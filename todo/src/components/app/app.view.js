import Project from '../project/project';

export default class AppView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};
    self.components = {
      projects: {},
    };

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('toggleSidebar', (state) => self.toggleSidebar(state))
      .subscribe('changeProject', ({ prev, active }) => self.changeProject({ prev, active }))
      .subscribe('changeProject', ({ active: projectId }) => self.loadProject(projectId));
  }

  loadProject(projectId) {
    const self = this;
    const { projects } = self.components;
    const project = projects[projectId];
    const todos = project.controller.getTodos();

    console.table(todos);
  }

  changeProject({ prev, active }) {
    const self = this;
    const { contentBody } = self.elements;

    if (prev) {
      self.components.projects[prev].controller.setActive(false);
    }

    self.components.projects[active].controller.setActive(true);
    contentBody.textContent = active;
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

  createProject({
    name,
    iconType,
    id,
    filter,
    node,
  }) {
    const self = this;
    const listItem = document.createElement('li');
    const project = new Project({
      name,
      iconType,
      id,
      filter,
    });

    listItem.classList.add('project-list__item');
    self.components.projects[id] = project;

    project.controller.render({ node: listItem });
    project.controller.module.events.subscribe('click', () => self.module.changeProject(id));

    node.append(listItem);
  }

  createDefaultProjects() {
    const self = this;
    const { projectList } = self.elements;

    self.createProject({
      name: 'Inbox',
      iconType: 'inbox',
      id: 'inbox',
      node: projectList.default,
    });

    self.createProject({
      name: 'Today',
      iconType: 'today',
      id: 'today',
      filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.00'),
      node: projectList.default,
    });

    self.createProject({
      name: 'Week',
      iconType: 'date_range',
      id: 'week',
      filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.01'),
      node: projectList.default,
    });

    self.createProject({
      name: 'Month',
      iconType: 'calendar_month',
      id: 'month',
      filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.02'),
      node: projectList.default,
    });
  }

  render({ node, appendType }) {
    const self = this;
    const { app } = self.elements;
    const { sidebarState } = self.module;

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

    self.createDefaultProjects();

    if (!sidebarState) {
      self.toggleSidebar(sidebarState);
    }

    self.module.changeProject('inbox');
  }
}
