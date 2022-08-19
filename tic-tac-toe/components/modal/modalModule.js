import PubSub from '../../libs/pubSub.js';

export default class ModalModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.params = params;
  }
}
