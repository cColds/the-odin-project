import PubSub from '../../libs/pubSub.js';

export default class GameModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.params = params;
  }
}
