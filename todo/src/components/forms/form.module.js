import PubSub from '../../libs/pubSub';

export default class FormModule {
  constructor(options) {
    const self = this;
    self.events = new PubSub();
    self.type = options.type;
    self.id = options.id;
    self.placeholder = options.placeholder;
    self.message = options.message;
  }
}
