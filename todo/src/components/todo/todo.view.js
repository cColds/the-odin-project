import vdate from '../../modules/vdate';
import appData from '../app/module/appData';

export default class TodoView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('update', () => self.update());
  }

  get priorityClass() {
    const self = this;
    const { priority } = self.module;

    switch (priority) {
      case 1: return 'btn btn_remember';
      case 2: return 'btn btn_important';
      case 3: return 'btn btn_critical';
      default: return 'btn';
    }
  }

  update() {
    const self = this;
    const {
      todo,
      checkboxBtn,
    } = self.elements;
    const {
      isCompleted,
    } = self.module;

    checkboxBtn.classList[isCompleted ? 'add' : 'remove']('btn_active');
    todo.classList[isCompleted ? 'add' : 'remove']('todo_active');
  }

  render({ node, appendType }) {
    const self = this;
    const { todo } = self.elements;
    const {
      title, description, dueDate, projectId, isCompleted,
    } = self.module;
    const activeProjectId = appData.getActiveProjectId();
    const { options: { todoParent } } = appData.getProject(activeProjectId);
    const project = appData.getProject(projectId);

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!todo || !(todo instanceof HTMLElement)) {
      self.elements.todo = document.createElement('div');
      self.elements.todo.classList.add('todo');

      node[appendType](self.elements.todo);
    } else {
      self.elements.todo.innerHTML = '';
    }

    self.elements.todo.innerHTML = `
      <button class="${self.priorityClass} todo__checkbox" type="button" aria-label="Complete Todo">
        <span class="material-symbols-rounded">done</span>
      </button>

      <div class="todo-body">
        <div class="todo__header">
          <h3 class="todo__title">${title}</h3>
          <span class="todo__due-date">
            ${dueDate ? vdate.dateToText(new Date(dueDate)) : 'No Date'}
            <span class="material-symbols-rounded">schedule</span>
          </span>

          <div class="todo-controls">
            <button class="btn todo-edit-btn" type="button" aria-label="Edit Todo">
              <span class="material-symbols-rounded">edit</span>
            </button>

            <button class="btn btn_critical todo-delete-btn" type="button" aria-label="Delete Todo">
              <span class="material-symbols-rounded">close</span>
            </button>
          </div>
        </div>

        <p class="todo__description">${description}</p>

        ${todoParent ? `
          <button class="btn btn_primary todo__parent" type="button" aria-label="${project.name} Project">
            <span class="material-symbols-rounded">${project.iconType}</span>
            ${project.name}
          </button>
        ` : ''}
      </div>
    `;

    self.elements.checkboxBtn = self.elements.todo.querySelector('.todo__checkbox');
    self.elements.title = self.elements.todo.querySelector('.todo__title');
    self.elements.date = self.elements.todo.querySelector('.todo__due-date');
    self.elements.editBtn = self.elements.todo.querySelector('.todo-edit-btn');
    self.elements.deleteBtn = self.elements.todo.querySelector('.todo-delete-btn');
    self.elements.description = self.elements.todo.querySelector('.todo__description');
    self.elements.parent = self.elements.todo.querySelector('.todo__parent');

    if (isCompleted) {
      self.elements.todo.classList.add('todo_active');
      self.elements.checkboxBtn.classList.add('btn_active');
    }
  }
}
