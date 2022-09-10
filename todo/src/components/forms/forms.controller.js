export default class FormsController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  get values() {
    const self = this;
    const { form, inputs } = self.view.elements;
    const { type } = self.module;
    const formData = new FormData(form);

    if (type === 'message') {
      return true;
    }

    if (type === 'create-project') {
      return {
        title: formData.get('project-title'),
      };
    }

    if (type === 'create-todo') {
      return {
        title: formData.get('todo-title'),
        description: formData.get('todo-description'),
        priority: +formData.get('todo-priority'),
        dueDate: inputs.dueDate.value?.getTime() || null,
        projectId: inputs.project.value?.id || null,
      };
    }

    return null;
  }

  formReset() {
    const self = this;
    const { reset: { callback } } = self.module;

    if (typeof callback === 'function') {
      callback();
    }

    self.events.publish('reset');
  }

  formSubmit() {
    const self = this;
    const { submit: { callback } } = self.module;

    if (typeof callback === 'function') {
      callback(self.values);
    }

    self.events.publish('submit', self.values);
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.events.publish('render', { node, appendType });

    const { form, formResetBtn, formSubmitBtn } = self.view.elements;

    form.addEventListener('submit', (e) => e.preventDefault());
    formResetBtn.addEventListener('click', () => self.formReset());
    formSubmitBtn.addEventListener('click', () => self.formSubmit());
  }
}
