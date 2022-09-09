class Project {
  constructor({
    id = crypto.randomUUID(),
    title,
    iconType = 'list_alt',
    filter = ({ projectId }) => projectId === this.id,
    type = 'user',
    options: {
      deleted = true,
      edited = true,
      added = true,
      parent = false,
    } = {},
  }) {
    const self = this;
    self.id = id;
    self.title = title;
    self.iconType = iconType;
    self.filter = filter;
    self.type = type;
    self.options = {
      deleted, edited, added, parent,
    };
  }

  setData({
    id = this.id,
    title = this.title,
    iconType = this.iconType,
    filter = this.filter,
    type = this.type,
    options: {
      deleted = this.deleted,
      edited = this.edited,
      added = this.added,
      parent = this.parent,
    } = this.options,
  }) {
    const self = this;
    self.id = id;
    self.title = title;
    self.iconType = iconType;
    self.filter = filter;
    self.type = type;
    self.options = {
      deleted, edited, added, parent,
    };
  }
}

export default Project;
