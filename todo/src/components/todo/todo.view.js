import vdate from '../../modules/vdate';
import appData from '../app/modules/app.data';

export default class TodoView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('update', () => self.update())
      .subscribe('editTodo', () => self.update());
  }

  get priorityClass() {
    const self = this;
    const { priority } = self.module.data;

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
      todo, todoCheckboxBtn, todoTitle,
      todoDate, todoDescription, todoParentBtn,
      todoParentBtnIcon, todoParentBtnLabel,
    } = self.elements;
    const {
      title, dueDate, description, projectId, isCompleted, isExpired,
    } = self.module.data;
    const activeProjectId = appData.getActiveProjectId();
    const { options: { parent } } = appData.getProject(activeProjectId);
    const project = appData.getProject(projectId);

    todo.classList[isCompleted ? 'add' : 'remove']('todo_active');
    todo.classList[isExpired ? 'add' : 'remove']('todo_expired');

    todoCheckboxBtn.className = `${self.priorityClass} todo__checkbox`;
    todoCheckboxBtn.classList[isCompleted ? 'add' : 'remove']('btn_active');

    todoTitle.textContent = title;
    todoDate.textContent = `${isExpired ? 'Expired: ' : ''}${dueDate ? vdate.dateToText(new Date(dueDate)) : 'No Date'}`;

    todoDescription.textContent = description;

    todoParentBtn.ariaLabel = project.title;
    todoParentBtn.classList[parent ? 'remove' : 'add']('hidden');
    todoParentBtnLabel.ariaLabel = project.title;

    todoParentBtnIcon.textContent = project.iconType;
  }

  render({ node, appendType }) {
    const self = this;
    const { todo } = self.elements;
    const {
      title, description, dueDate, projectId,
    } = self.module.data;
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

        <button class="btn btn_primary todo__parent" type="button" aria-label="${project.title} Project">
          <span class="material-symbols-rounded parent__icon">${project.iconType}</span>
          <span class="parent__label">${project.title}</span>
        </button>
      </div>
    `;

    self.elements.todoCheckboxBtn = self.elements.todo.querySelector('.todo__checkbox');
    self.elements.todoTitle = self.elements.todo.querySelector('.todo__title');
    self.elements.todoDate = self.elements.todo.querySelector('.todo__due-date');
    self.elements.todoEditBtn = self.elements.todo.querySelector('.todo-edit-btn');
    self.elements.todoDeleteBtn = self.elements.todo.querySelector('.todo-delete-btn');
    self.elements.todoDescription = self.elements.todo.querySelector('.todo__description');
    self.elements.todoParentBtn = self.elements.todo.querySelector('.todo__parent');
    self.elements.todoParentBtnIcon = self.elements.todo.querySelector('.parent__icon');
    self.elements.todoParentBtnLabel = self.elements.todo.querySelector('.parent__label');
  }
}
