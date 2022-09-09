export default class HeadingView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    self.module.events
      .subscribe('render', ({ node, appendType }) => self.render({ node, appendType }))
      .subscribe('setData', () => self.update())
      .subscribe('editData', () => self.update())
      .subscribe('update', () => self.update());
  }

  update() {
    const self = this;
    const {
      headingIcon, headingTitle, headingAddBtn, headingEditBtn, headingRemoveBtn,
    } = self.elements;
    const {
      title, iconType, options: { added, edited, deleted } = {},
    } = self.module.data;

    headingIcon.textContent = iconType;
    headingTitle.textContent = title;

    headingAddBtn.classList[added ? 'remove' : 'add']('hidden');
    headingEditBtn.classList[edited ? 'remove' : 'add']('hidden');
    headingRemoveBtn.classList[deleted ? 'remove' : 'add']('hidden');
  }

  render({ node, appendType }) {
    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    const self = this;
    const { heading } = self.elements;
    const { iconType, title } = self.module.data;

    if (!heading || !(heading instanceof HTMLElement)) {
      self.elements.heading = document.createElement('header');
      self.elements.heading.classList.add('heading');

      node[appendType](self.elements.heading);
    } else {
      self.elements.heading.innerHTML = '';
    }

    self.elements.heading.innerHTML = `
      <span class="material-symbols-rounded heading__icon">${iconType}</span>
      <h2 class="heading__title">${title}</h2>

      <div class="heading__controls">
        <button class="btn heading__add-todo-btn" type="button" aria-label="Add Todo">
          <span class="material-symbols-rounded">add</span>
        </button>

        <button class="btn heading__edit-project-btn" type="button" aria-label="Edit Project">
          <span class="material-symbols-rounded">edit</span>
        </button>

        <button class="btn btn_critical heading__remove-project-btn" type="button" aria-label="Remove Project">
          <span class="material-symbols-rounded">delete</span>
        </button>
      </div>
    `;

    self.elements.headingIcon = self.elements.heading.querySelector('.heading__icon');
    self.elements.headingTitle = self.elements.heading.querySelector('.heading__title');
    self.elements.headingAddBtn = self.elements.heading.querySelector('.heading__add-todo-btn');
    self.elements.headingEditBtn = self.elements.heading.querySelector('.heading__edit-project-btn');
    self.elements.headingRemoveBtn = self.elements.heading.querySelector('.heading__remove-project-btn');
  }
}
