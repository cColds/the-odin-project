export default class HeadingController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  get data() {
    const self = this;

    return self.module.data;
  }

  setData(data) {
    const self = this;

    self.module.setData(data);
  }

  createTodo() {
    const self = this;
    const { id, options: { added } } = self.data;

    if (added) {
      self.events.publish('createTodo', id);
    }
  }

  editProject() {
    const self = this;
    const { id, options: { edited } } = self.data;

    if (edited) {
      self.events.publish('editProject', id);
    }
  }

  removeProject() {
    const self = this;
    const { id, options: { deleted } } = self.data;

    if (deleted) {
      self.events.publish('removeProject', id);
    }
  }

  update() {
    const self = this;

    self.events.publish('update');
  }

  render({ node, appendType = 'append' }) {
    const self = this;

    self.module.events.publish('render', { node, appendType });

    const { headingAddBtn, headingEditBtn, headingRemoveBtn } = self.view.elements;

    headingAddBtn.addEventListener('click', () => self.createTodo());
    headingEditBtn.addEventListener('click', () => self.editProject());
    headingRemoveBtn.addEventListener('click', () => self.removeProject());
  }
}
