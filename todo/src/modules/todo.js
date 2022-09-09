import vdate from './vdate';

export default class Todo {
  constructor({
    id = crypto.randomUUID(),
    title,
    description,
    dueDate = null,
    priority = 0,
    projectId,
    isCompleted = false,
  }) {
    const self = this;
    self.id = id;
    self.title = title;
    self.description = description;
    self.dueDate = dueDate;
    self.priority = priority;
    self.projectId = projectId;
    self.isCompleted = isCompleted;
  }

  setData({
    title = this.title,
    description = this.description,
    dueDate = this.dueDate,
    priority = this.priority,
    projectId = this.projectId,
    isCompleted = this.isCompleted,
  }) {
    const self = this;
    self.title = title;
    self.description = description;
    self.dueDate = dueDate;
    self.priority = priority;
    self.projectId = projectId;
    self.isCompleted = isCompleted;
  }

  get isExpired() {
    const self = this;

    return vdate.isExpired(new Date(self.dueDate));
  }
}
