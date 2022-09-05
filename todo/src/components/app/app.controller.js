import projects from '../../modules/projects';

export default class AppController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  createProject({
    name,
    iconType = 'list_alt',
    id = crypto.randomUUID(),
    filter = null,
    type = 'user',
  }) {
    const self = this;
    const project = self.module.createProject({
      name, iconType, id, filter, type,
    });

    project.controller.events.subscribe('click', () => self.changeProject(id));
  }

  changeProject(projectId) {
    const self = this;

    self.module.changeProject(projectId);
  }

  toggleSidebar(state) {
    const self = this;

    self.module.toggleSidebar(state);
  }

  render({ node, appendType = 'append' }) {
    const self = this;
    self.module.events.publish('render', { node, appendType });

    const { sidebarState } = self.module;
    const { sidebarToggle } = self.view.elements;

    self.toggleSidebar(sidebarState);
    projects.forEach((project) => self.createProject(project));
    self.changeProject('inbox');
    sidebarToggle.addEventListener('click', () => self.toggleSidebar(!self.module.sidebarState));
  }
}
