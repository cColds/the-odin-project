import PubSub from '../../libs/pubSub';

export default class PopoverModule {
  constructor({ parent }) {
    const self = this;
    self.events = new PubSub();
    self.parent = parent;
    self.left = 0;
    self.top = 0;
  }

  show(position) {
    const self = this;

    self.position = position;

    self.events.publish('show', position);
  }

  getPosition({ type, body }) {
    const self = this;
    const parentRect = self.parent.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();

    if (type === 'top' || type === 'bottom') {
      self.left = parentRect.left + parentRect.width / 2 - bodyRect.width / 2;
    }

    if (type === 'top') {
      self.top = parentRect.top - bodyRect.height - 5;
    } else if (type === 'bottom') {
      self.top = parentRect.top + parentRect.height + 5;
    }

    return { top: self.top, left: self.left };
  }
}
