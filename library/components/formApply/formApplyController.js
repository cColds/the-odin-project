export default class FormApplyController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender());
  }

  onSubmit() {
    const self = this;

    self.module.params?.callback();
  }

  onRender() {
    const self = this;
    const { form } = self.view.elements;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      self.onSubmit();
    });
  }
}
