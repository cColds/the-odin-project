export default class FormController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender())
      .subscribe('renderTab', () => self.onRenderTab());
  }

  onChangeTab(tabId) {
    const self = this;
    const { tabId: currentTabId } = self.module;

    if (currentTabId !== tabId) {
      self.module.changeTab(tabId);
    }
  }

  onFormInput() {
    const self = this;
    const { inputs } = self.view.elements;
    const inputsKeys = Object.keys(inputs);
    let isValid = true;

    for (let i = 0; i < inputsKeys.length; i += 1) {
      const { module } = inputs[inputsKeys[i]];

      if (!module.isValid) {
        isValid = false;
        break;
      }
    }

    self.module.setValid(isValid);
  }

  onRenderTab() {
    const self = this;
    const { submit } = self.view.elements;

    submit.addEventListener('click', () => self.module?.onSubmit());

    self.onFormInput();
  }

  onRender() {
    const self = this;
    const { container: form, tabs } = self.view.elements;

    form.addEventListener('input', () => self.onFormInput());
    form.addEventListener('submit', (e) => e.preventDefault());

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => self.onChangeTab(i));
    });

    return self;
  }
}
