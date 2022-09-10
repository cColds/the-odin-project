import PubSub from '../../libs/pubSub';

export default class TodoModule {
  constructor(data) {
    const self = this;
    self.events = new PubSub();
    self.data = data;
  }
}
