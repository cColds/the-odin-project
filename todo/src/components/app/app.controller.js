import Form from '../forms/form';
import defautlProjects from './data/defautlProjects';
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

  createProject({
    name,
    iconType = 'list_alt',
    id = crypto.randomUUID(),
    filter = null,
    type = 'user',
    options: {
      deleted = true,
      edited = true,
      added = true,
    } = {},
  }) {
    const self = this;
    const project = self.module.createProject({
      name, iconType, id, filter, type, options: { deleted, edited, added },
    });

    project.events.subscribe('click', () => self.changeProject(id));
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

    defautlProjects.forEach((project) => self.createProject(project));
    storage.load('projects').then((userProjects) => userProjects.forEach((project) => self.createProject(project)));
    self.changeProject('inbox');

    self.module.createModal();

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
          }

          return true;
        },
      });
      self.modal.open();
    });
  }
}
