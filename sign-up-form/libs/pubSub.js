export default class PubSub {
  constructor() {
    const self = this;
    self.events = {};
  }

  subscribe(eventName, callback) {
    const self = this;

    if (!self.events[eventName]) {
      self.events[eventName] = [];
    }

    self.events[eventName].push(callback);

    return self;
  }

  publist(eventName, args) {
    const self = this;

    if (!self.events[eventName]) {
      return false;
    }

    return self.events.map((callback) => callback(args));
  }
}
