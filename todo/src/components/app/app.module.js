import PubSub from '../../libs/pubSub';

import Project from '../project/project';

export default class AppModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
    self.sidebarState = true;
    self.activeProjectId = null;
    self.projects = {};
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

  createProject({
    name,
    iconType,
    id,
    filter,
    type,
  }) {
    const self = this;
    const project = new Project({
      name,
      iconType,
      id,
      filter,
    });

    self.projects[id] = project;

    self.events.publish('createProject', { project, type });

    return project;
  }
}
