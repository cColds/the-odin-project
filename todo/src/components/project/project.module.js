import PubSub from '../../libs/pubSub';
import dataTodo from '../../data/todo.json';

export default class ProjectModule {
  constructor({
    name,
    iconType,
    id,
    filter,
  }) {
    const self = this;
    self.events = new PubSub();
    self.name = name;
    self.iconType = iconType;
    self.id = id;
    self.filter = filter;
    self.isActive = false;
  }

  setActive(state) {
    const self = this;

    self.isActive = state;

    self.events.publish('setActive', state);
  }

  getTodos() {
    const self = this;

    if (self.filter) {
      return self.filter(dataTodo.todos);
    }

    return dataTodo.todos.filter(({ 'parent-id': parentId }) => parentId === self.id);
  }
}
