import PubSub from '../../libs/pubSub';

export default class TodoModule {
  constructor(todo) {
    const self = this;
    self.events = new PubSub();
    self.id = todo.id;
    self.title = todo.title;
    self.description = todo.description;
    self.dueDate = todo.dueDate;
    self.priority = todo.priority;
    self.projectId = todo.projectId;
    self.isCompleted = todo.isCompleted;
    self.isExpired = todo.isExpired;
  }

  toggleComplete(isCompleted) {
    const self = this;

    self.isCompleted = isCompleted;

    self.events.publish('update');
  }
}
