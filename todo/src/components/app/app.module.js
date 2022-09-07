import PubSub from '../../libs/pubSub';
import Project from '../project/project';
import Todo from '../todo/todo';
import Modal from '../modal/modal';
import appData from './module/appData';

export default class AppModule {
  constructor() {
    const self = this;
    self.events = new PubSub();
    self.sidebarState = true;
    self.activeProjectId = null;
    self.projects = {};
    self.todos = {};
    self.modal = null;
  }

  updateProjects() {
    const self = this;
    const { projects } = self;

    Object.keys(projects).forEach((key) => projects[key].update());
  }

  toggleSidebar(state) {
    const self = this;

    self.sidebarState = state;

    self.events.publish('toggleSidebar', self.sidebarState);
  }

  createModal() {
    const self = this;

    self.modal = new Modal().controller;

    self.events.publish('createModal', self.modal);
  }

  createTodo(todo) {
    const self = this;
    const newTodo = new Todo(todo).controller;

    self.todos[todo.id] = newTodo;

    appData.addTodo(newTodo);

    self.updateProjects();

    self.events.publish('createTodo', newTodo);

    return newTodo;
  }

  changeProject(projectId) {
    const self = this;
    const prevProjectId = self.activeProjectId;

    self.activeProjectId = projectId;

    appData.setActiveProjectId(self.activeProjectId);

    self.events.publish('changeProject', { prevId: prevProjectId, activeId: self.activeProjectId });
  }

  createProject(project) {
    const self = this;
    const newProject = new Project(project).controller;

    self.projects[project.id] = newProject;

    appData.addProject(newProject);

    self.events.publish('createProject', { project: newProject, type: project.type });

    return newProject;
  }
}
