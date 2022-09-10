import appData from '../app/modules/app.data';

export default class TabView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('setActive', (isActive) => self.setActive(isActive))
      .subscribe('update', () => self.update());
  }

  setActive(isActive) {
    const self = this;
    const { tab } = self.elements;

    tab.classList[isActive ? 'add' : 'remove']('tab_active');
  }

  update() {
    const self = this;
    const { tabIcon, tabTitle, tabTodoCount } = self.elements;
    const {
      data: { title, iconType, filter }, isActive,
    } = self.module;
    const todosCounter = appData.getTodos(filter).length;

    tabIcon.textContent = iconType;
    tabTitle.textContent = title;

    if (todosCounter > 99) {
      tabTodoCount.textContent = '99+';
    } else {
      tabTodoCount.textContent = todosCounter;
    }

    self.setActive(isActive);
  }

  render({ node, appendType }) {
    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    const self = this;
    const { tab } = self.elements;

    if (!tab || !(tab instanceof HTMLElement)) {
      self.elements.tab = document.createElement('div');
      self.elements.tab.classList.add('tab');

      node[appendType](self.elements.tab);
    } else {
      self.elements.tab.innerHTML = '';
    }

    self.elements.tab.innerHTML = `
      <span class="material-symbols-rounded tab__icon"></span>
      <span class="tab__name"></span>
      <span class="tab__todo-count"></span>
    `;

    self.elements.tabIcon = self.elements.tab.querySelector('.tab__icon');
    self.elements.tabTitle = self.elements.tab.querySelector('.tab__name');
    self.elements.tabTodoCount = self.elements.tab.querySelector('.tab__todo-count');
  }
}
