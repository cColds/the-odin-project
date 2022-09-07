import PubSub from '../../libs/pubSub';
import Project from '../project/project';
import Modal from '../modal/modal';
import appData from './module/appData';
import storage from '../../modules/storage';

export default class AppModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
    self.sidebarState = true;
    self.activeProjectId = null;
    self.projects = {};
    self.modal = null;
  }

  toggleSidebar(state) {
    const self = this;

    self.sidebarState = state;

    self.events.publish('toggleSidebar', self.sidebarState);
  }

  changeProject(projectId) {
    const self = this;
    const prevProjectId = self.activeProjectId;

    self.activeProjectId = projectId;

    self.events.publish('changeProject', { prevId: prevProjectId, activeId: self.activeProjectId });
    self.events.publish('loadProject', self.projects[self.activeProjectId]);
  }

  createModal() {
    const self = this;

    self.modal = new Modal().controller;

    self.events.publish('createModal', self.modal);
  }

  createProject(project) {
    const self = this;
    const newProject = new Project(project).controller;

    self.projects[project.id] = newProject;

    appData.addProject(project);

    if (project.type === 'user') {
      storage.save('projects', appData.getUserProjects());
    }

    self.events.publish('createProject', { project: newProject, type: project.type });

    return newProject;
  }
}
