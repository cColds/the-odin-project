import PubSub from '../../libs/pubSub.js';

export default class ModalModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.node = params?.node || null;
    self.isVisible = false;
  }

  toggleVisible(isVisible) {
    const self = this;

    self.isVisible = isVisible;

    self.events.publish('toggleVisible', isVisible);
  }
}
