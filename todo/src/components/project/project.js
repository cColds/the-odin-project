import './scss/project.scss';

import ProjectModule from './project.module';
import ProjectView from './project.view';
import ProjectController from './project.controller';

export default class Project {
  constructor({
    name,
    iconType = 'list_alt',
    id = crypto.randomUUID(),
    filter = null,
  }) {
    const self = this;
    const module = new ProjectModule({
      name,
      iconType,
      id,
      filter,
    });
    const view = new ProjectView(module);
    const controller = new ProjectController(module, view);

    self.controller = controller;
  }
}
