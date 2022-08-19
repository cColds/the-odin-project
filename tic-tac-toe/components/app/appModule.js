import PubSub from '../../libs/pubSub.js';

export default class AppModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.params = params;
  }
}
