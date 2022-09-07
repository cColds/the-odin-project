import PubSub from '../../libs/pubSub';
import appData from '../app/module/appData';

export default class ProjectModule {
  constructor(project) {
    const self = this;
    self.events = new PubSub();
    self.name = project.name;
    self.iconType = project.iconType;
    self.id = project.id;
    self.filter = project.filter;
    self.type = project.type;
    self.options = {
      deleted: project.options?.deleted,
      edited: project.options?.edited,
      added: project.options?.added,
      todoParent: project.options?.todoParent,
    };
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
      return self.filter(appData.getTodos());
    }

    return appData.getTodos().filter(({ projectId }) => projectId === self.id);
  }
}
