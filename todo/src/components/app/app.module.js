import PubSub from '../../libs/pubSub';

export default class AppModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
    self.sidebarState = true;
    self.activeProjectId = null;
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

    self.events.publish('changeProject', { prev: prevProjectId, active: self.activeProjectId });
  }
}
