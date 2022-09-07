// import Popover from '../popover/popover';

export default class DropdownController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;
  }

  get events() {
    const self = this;

    return self.module.events;
  }

  render({ node, appendType = 'append', classList = [] }) {
    const self = this;

    self.events.publish('render', { node, appendType, classList });
  }
}
