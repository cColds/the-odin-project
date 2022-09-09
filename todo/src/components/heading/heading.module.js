import PubSub from '../../libs/pubSub';

export default class HeadingModule {
  constructor(data) {
    const self = this;
    self.events = new PubSub();
    self.data = data;
  }

  editData(data) {
    const self = this;

    self.data.setData(data);

    self.events.publish('editData');
  }

  setData(data) {
    const self = this;

    self.data = data;

    self.events.publish('setData');
  }
}
