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
    title, isCritical, bodyRender, submit, reset,
  }) {
    const self = this;

    self.title = title;
    self.isCritical = isCritical;
    self.bodyRender = bodyRender;
    self.submit = submit;
    self.reset = reset;
  }
}
