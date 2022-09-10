import PubSub from '../../libs/pubSub';

export default class FormsModule {
  constructor(options) {
    const self = this;
    self.events = new PubSub();
    self.type = options?.type || 'message';
    self.message = options?.message || 'No Body Content';
    self.values = options?.values || {};
    self.submit = {
      type: options?.submit?.type || 'normal',
      title: options?.submit?.title || 'Confirm',
      callback: options?.submit?.callback || null,
    };
    self.reset = {
      type: options?.reset?.type || 'normal',
      title: options?.reset?.title || 'Cancel',
      callback: options?.reset?.callback || null,
    };
  }
}
