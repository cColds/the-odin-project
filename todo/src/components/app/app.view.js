import Heading from '../heading/heading';
import Tab from '../tab/tab';
import Todo from '../todo/todo';

export default class AppView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};
    self.components = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('toggleSidebar', (state) => self.toggleSidebar(state))
      .subscribe('updateTabs', () => self.updateTabs())
      .subscribe('changeTab', ({ prevId, currentId }) => self.changeTab(prevId, currentId))
      .subscribe('createTab', (project) => self.createTab(project))
      .subscribe('createTodo', (todo) => self.createTodo(todo))
      .subscribe('removeTodos', () => self.removeTodos())
      .subscribe('deleteTodo', (id) => self.deleteTodo(id))
      .subscribe('goToTodo', (id) => self.goToTodo(id))
      .subscribe('removeProject', (id) => self.removeProject(id));
  }

  removeProject(id) {
    const self = this;
    const { tabs } = self.components;
    const { tabListItems } = self.elements;

    if (tabListItems?.[id]) {
      tabListItems[id].remove();

      delete tabListItems[id];
      delete tabs[id];
    }
  }

  toggleSidebar(state) {
    const self = this;
    const { app } = self.elements;

    app.classList[state ? 'remove' : 'add']('sidebar-hide');
  }

  updateTabs() {
    const self = this;
    const { tabs } = self.components;
    const keys = Object.keys(tabs);

    keys.forEach((key) => tabs[key].update());
  }

  changeTab(prevId, currentId) {
    const self = this;
    const { contentBody } = self.elements;
    const { tabs } = self.components;
    const prevProject = tabs[prevId];
    const currentProject = tabs[currentId];

    if (prevProject) {
      prevProject.setActive(false);
    }

    currentProject.setActive(true);

    contentBody.scrollIntoView();
  }

  createTab(project) {
    const self = this;
    const { tabList } = self.elements;
    const { id, type } = project;
    const listItem = document.createElement('li');

    if (!self.components.tabs) {
      self.components.tabs = {};
      self.elements.tabListItems = {};
    }

    self.components.tabs[id] = new Tab(project).controller;
    self.components.tabs[id].render({
      node: listItem,
    });
    self.elements.tabListItems[id] = listItem;

    listItem.classList.add('list__item');

    tabList[type].append(listItem);
  }

  goToTodo(id) {
    const self = this;
    const { todoListItems } = self.elements;

    todoListItems[id].scrollIntoView({
      behavior: 'smooth', block: 'center', inline: 'center',
    });

    todoListItems[id].classList.add('highlight');
  }

  deleteTodo(id) {
    const self = this;
    const { todoListItems = {} } = self.elements;

    if (todoListItems?.[id]) {
      todoListItems[id].remove();
      delete todoListItems[id];
    }
  }

  removeTodos() {
    const self = this;
    const { todos = {} } = self.components;

    Object.keys(todos).forEach((id) => self.deleteTodo(id));

    self.components.todos = {};
    self.elements.todoListItems = {};
  }

  createTodo(todo) {
    const self = this;
    const { todoList } = self.elements;
    const { id } = todo;
    const listItem = document.createElement('li');

    if (!self.components.todos) {
      self.components.todos = {};
      self.elements.todoListItems = {};
    }

    self.components.todos[id] = new Todo(todo).controller;
    self.components.todos[id].render({
      node: listItem,
    });
    self.elements.todoListItems[id] = listItem;

    listItem.classList.add('list__item');

    todoList.prepend(listItem);
  }

  render({ node, appendType }) {
    const self = this;
    const { app } = self.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!app || !(app instanceof HTMLElement)) {
      self.elements.app = document.createElement('div');
      self.elements.app.classList.add('app');

      node[appendType](self.elements.app);
    } else {
      self.elements.app.innerHTML = '';
    }

    self.elements.app.innerHTML = `
      <aside class="app__sidebar">
        <button class="btn sidebar__toggle" type="button" aria-label="Show Sidebar">
          <span class="material-symbols-rounded btn-icon sidebar__toggle-icon">menu</span>
        </button>

        <div class="sidebar__content">
          <header class="sidebar__header">
            <span class="material-symbols-rounded material-symbols-rounded_fill header-icon">assignment</span>
            <h1 class="header__title">todome</h1>
          </header>

          <div class="sidebar__body">
            <ul class="tab__list tab__list-default">
            </ul>

            <div class="body-container">
              <div class="body-container__header">
                <h2 class="header__title">projects</h2>

                <button class="btn tab__create-btn" type="button" aria-label="Create Project">
                  <span class="material-symbols-rounded btn-icon">add</span>
                </button>
              </div>

              <ul class="tab__list tab__list-user">
              </ul>
            </div>
          </div>

          <footer class="sidebar__footer">
            <span class="footer__copyright">
              © <a href="http://github.com/vyachnd" target="_blank" rel="noopener">vyachnd</a>, 2022
            </span>
          </footer>
        </div>
      </aside>

      <main class="app__content">
        <div class="content-wrapper">
          <div class="todo__list"></div>
        </div>
      </main>
    `;

    self.elements.sidebar = self.elements.app.querySelector('.app__sidebar');
    self.elements.sidebarToggle = self.elements.app.querySelector('.sidebar__toggle');
    self.elements.sidebarBody = self.elements.sidebar.querySelector('.sidebar__body');
    self.elements.contentBody = self.elements.app.querySelector('.app__content .content-wrapper');
    self.elements.tabList = {
      default: self.elements.sidebarBody.querySelector('.tab__list-default'),
      user: self.elements.sidebarBody.querySelector('.tab__list-user'),
    };
    self.elements.tabCreateBtn = self.elements.sidebarBody.querySelector('.tab__create-btn');
    self.elements.todoList = self.elements.app.querySelector('.todo__list');

    self.components.heading = new Heading().controller;
    self.components.heading.render({
      node: self.elements.contentBody,
      appendType: 'prepend',
    });
  }
}
