import PubSub from '../../libs/pubSub';

export default class DropdownModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
  }
}
