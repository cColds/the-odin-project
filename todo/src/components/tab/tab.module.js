import PubSub from '../../libs/pubSub';

export default class TabModule {
  constructor(data) {
    const self = this;
    self.events = new PubSub();
    self.data = data;
    self.isActive = data.isActive;
  }

  setActive(isActive) {
    const self = this;

    self.isActive = isActive;

    self.events.publish('setActive', isActive);
  }
}
