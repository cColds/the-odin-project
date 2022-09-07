import './scss/project.scss';

import ProjectModule from './project.module';
import ProjectView from './project.view';
import ProjectController from './project.controller';

export default class Project {
  constructor(project) {
    const self = this;
    const module = new ProjectModule(project);
    const view = new ProjectView(module);
    const controller = new ProjectController(module, view);

    self.controller = controller;
  }
}
