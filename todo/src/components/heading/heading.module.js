import PubSub from '../../libs/pubSub';

export default class HeadingModule {
  constructor(data) {
    const self = this;
    self.events = new PubSub();
    self.data = data;
  }

  setData(data) {
    const self = this;

    self.data = data;

    self.events.publish('setData');
  }
}
