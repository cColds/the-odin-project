export default class FormController {
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

    if (type === 'create-project') {
      return {
        name: formData.get('project-name'),
      };
    } if (type === 'create-task') {
      return {
        title: formData.get('task-title'),
        description: formData.get('task-description'),
        priority: +formData.get('task-priority'),
        dueDate: inputs.dueDate.value,
      };
    }

    return {};
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.events.publish('render', { node, appendType });

    const { form } = self.view.elements;

    form.addEventListener('submit', (e) => e.preventDefault());
  }
}
