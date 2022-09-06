import projects from '../../modules/projects';
import Form from '../forms/form';

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
    const { sidebarToggle, createProjectBtn } = self.view.elements;

    self.toggleSidebar(sidebarState);

    projects.forEach((project) => self.createProject(project));
    self.changeProject('inbox');

    self.module.createModal();

    sidebarToggle.addEventListener('click', () => self.toggleSidebar(!self.module.sidebarState));
    createProjectBtn.addEventListener('click', () => {
      const createProjectFrom = new Form({ type: 'create-task', id: 'modal__form' }).controller;

      self.modal.setContent({
        title: 'Create Project',
        bodyRender: createProjectFrom,
        submit: () => {
          const { values } = createProjectFrom;
          console.table(values);

          return true;
        },
      });
      self.modal.open();
    });
  }
}
