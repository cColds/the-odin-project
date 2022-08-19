export default class MenuController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.render());
  }

  getFormData() {
    const self = this;
    const { menu } = self.view.elements;
    const formData = new FormData(menu);
    const formEntries = formData.entries();
    let data = formEntries.next();
    const res = {};

    while (!data.done) {
      const key = data.value[0];
      const value = data.value[1];

      res[key] = value;

      data = formEntries.next();
    }

    return {
      first: {
        name: res['first-p-name'],
        isComputer: Boolean(Number(res['first-p-type'])),
        difficulty: Number(res['first-p-diff']),
      },
      second: {
        name: res['secnd-p-name'],
        isComputer: Boolean(Number(res['secnd-p-type'])),
        difficulty: Number(res['secnd-p-diff']),
      },
    };
  }

  submit() {
    const self = this;
    const formData = self.getFormData();

    self.module.events.publish('submit', formData);
  }

  render() {
    const self = this;
    const { menu } = self.view.elements;

    menu.addEventListener('submit', (e) => {
      e.preventDefault();
      self.submit();
    });
  }
}
