import PubSub from '../../libs/pubSub';

export default class ModalModule {
  constructor(options) {
    const self = this;
    self.events = new PubSub();
    self.title = options?.title || 'Modal';
    self.open = options?.open || false;
  }
}
