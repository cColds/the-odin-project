import DatePicker from '../datePicker/datePicker';
import Dropdown from '../dropdown/dropdown';

export default class FormsView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }));
  }

  renderCreateTask() {
    const self = this;
    const { form } = self.elements;

    form.innerHTML = `
      <div class="input-block">
        <h3 class="input__label">Title</h3>
        <input id="task-title" class="input" type="text" name="task-title" placeholder="Task title">
      </div>

      <div class="input-block">
        <h3 class="input__label">Description</h3>
        <textarea id="task-description" class="input" type="text" name="task-description" placeholder="Task description"></textarea>
      </div>

      <div class="input-block">
        <h3 class="input__label">Due Date</h3>
      </div>

      <div class="input-block input-block-line">
        <h3 class="input__label">Priority</h3>

        <div class="radio-block">
          <input id="no-priority" class="input-radio" type="radio" name="task-priority" value="0" checked>
          <label for="no-priority" class="btn"><span class="material-symbols-rounded">done</span></label>

          <input id="priority-remember" class="input-radio" type="radio" name="task-priority" value="1">
          <label for="priority-remember" class="btn btn_remember"><span class="material-symbols-rounded">done</span></label>

          <input id="priority-important" class="input-radio" type="radio" name="task-priority" value="2">
          <label for="priority-important" class="btn btn_important"><span class="material-symbols-rounded">done</span></label>

          <input id="priority-critical" class="input-radio" type="radio" name="task-priority" value="3">
          <label for="priority-critical" class="btn btn_critical"><span class="material-symbols-rounded">done</span></label>
        </div>
      </div>

      <div class="input-block">
        <h3 class="input__label">Project</h3>
      </div>
    `;

    const datePicker = new DatePicker().controller;
    datePicker.render({
      node: form.querySelectorAll('.input-block')[2],
      classList: ['input'],
    });

    const dropdown = new Dropdown({
      items: [
      ],
    }).controller;
    dropdown.render({
      node: form.querySelectorAll('.input-block')[4],
      classList: ['input'],
    });

    self.elements.inputs = {
      title: form.querySelector('#task-title'),
      description: form.querySelector('#task-description'),
      priority: form.querySelector('[name=task-priority]:checked'),
      dueDate: datePicker,
      project: dropdown,
    };
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
    }
  }
}
