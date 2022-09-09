import './scss/todo.scss';

import TodoModule from './todo.module';
import TodoView from './todo.view';
import TodoController from './todo.controller';

export default class Todo {
  constructor(data) {
    const self = this;
    const module = new TodoModule(data);
    const view = new TodoView(module);
    const controller = new TodoController(module, view);

    self.controller = controller;
  }
}
