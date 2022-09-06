import PubSub from '../../libs/pubSub';

export default class FormModule {
  constructor({ type, id }) {
    const self = this;
    self.events = new PubSub();
    self.type = type;
    self.id = id;
  }
}
