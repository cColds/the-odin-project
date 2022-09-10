import PubSub from '../../libs/pubSub';
import appData from './modules/app.data';
import storage from '../../modules/storage';

export default class AppModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
    self.data = appData;
  }

  toggleSidebar(state) {
    const self = this;

    self.data.isSidebarShown = state;

    self.events.publish('toggleSidebar', state);
  }

  deleteTodo(id) {
    const self = this;

    self.data.removeTodo(id);

    self.events.publish('deleteTodo', id);
  }

  editTodo(id, todoData) {
    const self = this;
    const todo = appData.getTodo(id);

    if (todo) {
      todo.setData(todoData);
    }

    self.events.publish('editTodo', todo);
  }

  loadTodo(todo) {
    const self = this;

    self.data.addTodo(todo);
  }

  updateTabs() {
    const self = this;

    self.events.publish('updateTabs');
  }

  changeTab(projectId) {
    const self = this;
    const prevId = self.data.activeProjectId;

    self.data.activeProjectId = projectId;

    self.events.publish('changeTab', {
      prevId,
      currentId: projectId,
    });
  }

  createTab(project) {
    const self = this;

    self.data.addProject(project);

    self.events.publish('createTab', project);
  }

  removeProject(projectId) {
    const self = this;

    self.data.removeProject(projectId);

    self.events.publish('removeProject', projectId);

    storage.save('projects', appData.getUserProjects());
    storage.save('todos', appData.getTodos());
  }
}
