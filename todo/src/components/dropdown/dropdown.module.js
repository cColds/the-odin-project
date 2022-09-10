import PubSub from '../../libs/pubSub';

export default class DropdownModule {
  constructor({ items, selectedId }) {
    const self = this;
    self.events = new PubSub();
    self.items = items;
    self.selectedId = selectedId;
    self.value = items?.[selectedId] || null;
  }

  set value(item) {
    const self = this;
    const prev = self.item;

    self.item = item;

    self.events.publish('setValue', { prev, current: self.item });
  }

  get value() {
    const self = this;

    return self.item || null;
  }

  setValue(index) {
    const self = this;

    if (self.items[index]) {
      self.value = self.items[index];
      self.selectedId = index;
    } else {
      self.value = null;
    }

    self.events.publish('setValue');
  }
}
