import PubSub from '../../libs/pubSub.js';

export default class FormModule {
  constructor(params) {
    const self = this;
    self.events = new PubSub();
    self.node = params?.node || null;
    self.tabId = params?.tabId || 0;
    self.onSubmit = params?.onSubmit || null;
    self.isValid = false;
  }

  setValid(isValid) {
    const self = this;

    self.isValid = isValid;

    self.events.publish('setValid', isValid);
  }

  changeTab(tabId) {
    const self = this;
    const prevTabId = self.tabId;

    self.tabId = tabId;
    self.events.publish('changeTab', { prevTabId, tabId });
  }
}
