import PubSub from '../../libs/pubSub';

export default class ModalModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
    self.title = 'Modal';
    self.isCritical = false;
    self.submit = null;
    self.reset = null;
  }

  setContent({
    title, isCritical, submit, reset,
  }) {
    const self = this;

    self.title = title;
    self.isCritical = isCritical;
    self.submit = submit;
    self.reset = reset;

    self.events.publish('setContent', { title, isCritical });
  }
}
