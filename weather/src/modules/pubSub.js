export default class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return this;
  }

  publish(eventName, args) {
    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach((callback) => callback(args));

    return true;
  }
}
