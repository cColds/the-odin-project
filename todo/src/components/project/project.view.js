export default class ProjectView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('setActive', (state) => self.setActive(state))
      .subscribe('update', () => self.update());
  }

  setActive(state) {
    const self = this;
    const { project } = self.elements;

    project.classList[state ? 'add' : 'remove']('project_active');
  }

  update() {
    const self = this;
    const { projectIcon, porjectName, todoCount } = self.elements;
    const { name, iconType } = self.module;
    const todosLength = self.module.getTodos().length;

    projectIcon.textContent = iconType;
    porjectName.textContent = name;

    if (todosLength > 99) {
      todoCount.textContent = '99+';
    } else {
      todoCount.textContent = todosLength;
    }
  }

  render({ node, appendType }) {
    const self = this;
    const { project } = self.elements;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!project || !(project instanceof HTMLElement)) {
      self.elements.project = document.createElement('div');
      self.elements.project.classList.add('project');

      node[appendType](self.elements.project);
    } else {
      self.elements.project.innerHTML = '';
    }

    self.elements.project.innerHTML = `
      <span class="material-symbols-rounded project__icon"></span>
      <span class="project__name"></span>
      <span class="project__todo-count"></span>
    `;

    self.elements.projectIcon = self.elements.project.querySelector('.project__icon');
    self.elements.porjectName = self.elements.project.querySelector('.project__name');
    self.elements.todoCount = self.elements.project.querySelector('.project__todo-count');

    self.update();
  }
}
