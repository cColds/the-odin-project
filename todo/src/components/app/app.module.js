import PubSub from '../../libs/pubSub';

export default class AppModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
    self.sidebarState = true;
  }

  toggleSidebar(state) {
    const self = this;

    self.sidebarState = state;

    self.events.publish('toggleSidebar', self.sidebarState);
  }
}
