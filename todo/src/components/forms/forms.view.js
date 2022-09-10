import DatePicker from '../datePicker/datePicker';
import Dropdown from '../dropdown/dropdown';
import appData from '../app/modules/app.data';

export default class FormsView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }));
  }

  renderCreateTodo() {
    const self = this;
    const { formBody } = self.elements;
    const { values } = self.module;

    formBody.innerHTML = `
      <div class="form-block">
        <label class="form__label" for="todo-title">Title</label>
        <input
          id="todo-title"
          class="form__input"
          type="text"
          minlength="3"
          maxlength="16"
          name="todo-title"
          placeholder="Todo Title"
          required
        >
      </div>

      <div class="form-block">
        <label class="form__label" for="todo-description">Description</label>
        <textarea
          id="todo-description"
          class="form__input"
          maxlength="60"
          name="todo-description"
          placeholder="Todo Description"
          required
        ></textarea>
      </div>

      <div class="form-block">
        <label class="form__label" for="todo-description">Due Date</label>
      </div>

      <div class="form-block form-block_inline">
        <label class="form__label">Priority</label>

        <div class="form-block form-block_inline form-block_radio">
          <input id="todo-priority-no" class="form__input-radio" type="radio" name="todo-priority" value="0" checked>
          <label for="todo-priority-no" class="btn"><span class="material-symbols-rounded">done</span></label>

          <input id="todo-priority-remember" class="form__input-radio" type="radio" name="todo-priority" value="1">
          <label for="todo-priority-remember" class="btn btn_remember"><span class="material-symbols-rounded">done</span></label>

          <input id="todo-priority-important" class="form__input-radio" type="radio" name="todo-priority" value="2">
          <label for="todo-priority-important" class="btn btn_important"><span class="material-symbols-rounded">done</span></label>

          <input id="todo-priority-critical" class="form__input-radio" type="radio" name="todo-priority" value="3">
          <label for="todo-priority-critical" class="btn btn_critical"><span class="material-symbols-rounded">done</span></label>
        </div>
      </div>

      <div class="form-block">
        <label class="form__label">Project</label>
      </div>
    `;

    const datePicker = new DatePicker().controller;
    datePicker.render({
      node: formBody.querySelectorAll('.form-block')[2],
      classList: ['form__input'],
    });

    const items = [
      ...appData.getProjectsByOptions({ added: true }),
      ...appData.getUserProjects(),
    ];
    const currentProject = items.filter(({ id }) => id === appData.activeProjectId)[0];
    let selectedId = items.indexOf(currentProject);

    if (selectedId < 0) {
      selectedId = null;
    }

    const dropdown = new Dropdown({ items, selectedId }).controller;
    dropdown.render({
      node: formBody.querySelectorAll('.form-block')[5],
      classList: ['form__input'],
    });

    self.elements.inputs = {
      title: formBody.querySelector('#todo-title'),
      description: formBody.querySelector('#todo-description'),
      priority: formBody.querySelectorAll('[name=todo-priority]'),
      dueDate: datePicker,
      project: dropdown,
    };

    self.elements.inputs.title.value = values?.title || null;
    self.elements.inputs.description.value = values?.description || null;
    if (values.priority) {
      const index = values.priority;
      self.elements.inputs.priority[index].checked = true;
    }
    if (values.dueDate) {
      self.elements.inputs.dueDate.setValue(new Date(values.dueDate));
    }
    if (values.project) {
      const index = items.indexOf(values.project);
      self.elements.inputs.project.setValue(index);
    }
  }

  renderCreateProject() {
    const self = this;
    const { formBody } = self.elements;
    const { values } = self.module;

    formBody.innerHTML = `
      <div class="form-block">
        <label for="project-title" class="form__label">Title</label>
        <input
          id="project-title"
          class="form__input"
          type="text"
          minlength="3"
          maxlength="16"
          name="project-title"
          placeholder="Project Title"
          required
        >
      </div>
    `;

    self.elements.inputs = {
      projectTitle: formBody.querySelector('input[name="project-title"]'),
    };

    self.elements.inputs.projectTitle.value = values?.projectTitle || null;
    self.elements.inputs.projectTitle.focus();
  }

  renderMessage() {
    const self = this;
    const { formBody } = self.elements;
    const { message } = self.module;

    formBody.innerHTML = `<p class="form__message">${message}</p>`;
  }

  render({ node, appendType }) {
    const self = this;
    const { form } = self.elements;
    const { type, reset, submit } = self.module;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!form || !(form instanceof HTMLElement)) {
      self.elements.form = document.createElement('form');
      self.elements.form.classList.add('form');

      node[appendType](self.elements.form);
    } else {
      self.elements.form.innerHTML = '';
    }

    self.elements.form.innerHTML = `
      <div class="form__body"></div>

      <footer class="form__footer">
        <button class="btn btn_primary" type="reset" aria-label="${reset.title}">${reset.title}</button>
        <button class="btn" type="submit" aria-label="${submit.title}">${submit.title}</button>
      </footer>
    `;

    self.elements.formBody = self.elements.form.querySelector('.form__body');
    self.elements.formResetBtn = self.elements.form.querySelector('button[type="reset"]');
    self.elements.formSubmitBtn = self.elements.form.querySelector('button[type="submit"]');

    if (reset.type === 'critical') {
      self.elements.formResetBtn.classList.add('btn_critical');
    }

    if (submit.type === 'critical') {
      self.elements.formSubmitBtn.classList.add('btn_critical');
    }

    if (type === 'message') {
      self.renderMessage();
    } else if (type === 'create-project') {
      self.renderCreateProject();
    } else if (type === 'create-todo') {
      self.renderCreateTodo();
    }
  }
}
