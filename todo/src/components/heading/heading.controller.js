import getTestTodos from '../app/data/testTodos';

const WORDS = [
  'Luctus', 'Vel', 'Augue', 'Maecenas', 'Aptent', 'Sollicitudin', 'Amet',
  'Amet', 'Integer', 'Sapien', 'Curabitur', 'Proin', 'Dapibus', 'Eros',
  'Vestibulum', 'Tempus', 'Curae', 'Etiam', 'Curae', 'Etiam', 'Sit', 'Egestas',
  'Vehicula', 'Lorem', 'Porttitor', 'Nostra', 'Ornare', 'Conubia', 'Rutrum', 'Erat',
  'Potenti', 'Accumsan', 'Torquent', 'Sit', 'Vivamus', 'Pharetra', 'Placerat', 'Vel',
  'Non', 'Suscipit', 'Fusce', 'Quisque', 'Fusce', 'Odio', 'Tempus', 'Integer', 'Fringilla',
  'Massa', 'Quisque', 'Consectetur', 'Magna', 'A', 'Sapien', 'Fusce', 'Cursus', 'Dui', 'Odio',
  'Malesuada', 'Taciti', 'Placerat', 'Felis', 'Tempor', 'Quis', 'Per', 'Egestas', 'Semper',
  'Convallis', 'Molestie', 'Enim', 'Eros', 'Inceptos', 'Dictum', 'Venenatis', 'Hendrerit', 'Risus',
  'Est', 'Porttitor', 'Nullam', 'Commodo', 'Feugiat', 'Etiam', 'Porta', 'Vulputate', 'Blandit',
  'Molestie', 'Hendrerit', 'Feugiat', 'Eu', 'Sodales', 'Eleifend', 'Inceptos', 'Cubilia', 'Luctus',
  'Nunc', 'Amet', 'Mattis', 'Lacinia', 'Quisque', 'Erat', 'Erat', 'Porta', 'Ultricies', 'Faucibus',
  'Pretium', 'Enim', 'Tortor', 'Libero', 'Condimentum', 'Rutrum', 'Vulputate', 'Aliquam',
  'Ullamcorper', 'Dictumst', 'Lobortis', 'Lobortis', 'Nullam', 'Aliquet', 'Nunc', 'Convallis',
  'Massa', 'In', 'Vehicula', 'Nam', 'Volutpat', 'Sapien', 'Aenean', 'Nisi', 'Tempus', 'Sit',
  'Integer', 'Diam', 'Pharetra', 'Mattis', 'Per', 'Fermentum', 'Fusce', 'Laoreet', 'Quisque',
  'Eget', 'Id', 'Vel', 'Lectus', 'Nisl', 'Tempus', 'Tellus', 'In', 'Conubia', 'Inceptos', 'Erat',
  'Senectus', 'Bibendum', 'Duis', 'Maecenas', 'Eu', 'Gravida', 'Porttitor', 'Nulla', 'Pellentesque',
  'Malesuada', 'Lobortis', 'Sollicitudin', 'Sapien', 'Etiam', 'Tincidunt', 'Mi', 'Sodales',
  'Bibendum', 'Taciti', 'Morbi', 'Lorem', 'Elementum', 'Vitae', 'Sociosqu', 'Suscipit', 'Consequat',
  'Sem', 'Felis', 'Etiam', 'Adipiscing', 'Tempor', 'Tristique', 'Vivamus', 'Quisque', 'Libero',
  'Sit', 'Consectetur', 'Potenti', 'Primis', 'Netus', 'Ultrices', 'Blandit', 'Ut', 'Nisi', 'Ornare',
  'Id', 'Nostra', 'Sodales', 'Lacinia', 'Egestas', 'Rutrum', 'Libero', 'Proin', 'Sodales',
  'Habitant', 'Cras', 'Tristique', 'Auctor', 'Eget', 'Ipsum', 'Tortor', 'Mauris', 'Faucibus',
  'Auctor', 'Massa', 'Vulputate', 'Tincidunt', 'Placerat', 'In', 'Quisque', 'Aenean', 'Cubilia',
  'Bibendum', 'Lobortis', 'Sagittis', 'Nibh', 'Auctor', 'Conubia', 'Enim', 'Platea', 'Tristique',
  'Fusce', 'Arcu', 'Ante', 'Ultrices', 'Quisque', 'Nostra', 'Sociosqu', 'Erat', 'Enim', 'Molestie',
  'Arcu', 'Nullam', 'Taciti', 'Massa', 'Tortor', 'Ultricies', 'Amet', 'Himenaeos', 'Accumsan',
  'Senectus', 'Imperdiet', 'Donec', 'Auctor', 'Libero', 'Varius', 'Quisque', 'Cras', 'Senectus',
  'Amet', 'Tempus', 'Class', 'Luctus', 'Sollicitudin', 'Amet', 'Aenean', 'Etiam', 'Curabitur',
  'Condimentum', 'Fames', 'Vitae', 'Taciti', 'Dictumst', 'Convallis', 'Vehicula', 'Libero',
  'Consequat', 'Interdum', 'Malesuada', 'Eu', 'Sit', 'Etiam', 'Integer', 'Ad', 'Senectus', 'Dui',
  'A', 'Sit', 'Sed', 'Amet', 'Ante', 'Donec', 'Aenean', 'Luctus', 'Sed', 'Interdum', 'Commodo',
  'Molestie', 'Vivamus', 'Per', 'Facilisis', 'Viverra', 'Lobortis', 'Curabitur', 'Nisl', 'Lectus',
  'Leo', 'Nec', 'Elit', 'Suspendisse', 'Odio', 'Praesent', 'Ante', 'Aenean', 'Aliquet', 'Porttitor',
  'Nulla', 'Conubia', 'Egestas', 'Euismod', 'Tempus', 'Lorem', 'Vivamus', 'Tortor', 'Torquent',
  'Mauris', 'Ultrices', 'Auctor', 'Erat', 'Nisl', 'Libero', 'Varius', 'Augue', 'Mauris',
  'Habitasse', 'Convallis', 'Non', 'Sapien', 'Curabitur', 'Lobortis', 'Etiam', 'Inceptos', 'In',
  'Nec', 'Turpis', 'Aptent', 'Dictumst', 'Est', 'Vehicula', 'Nec', 'Lacinia', 'Rhoncus', 'Proin',
  'Varius', 'Duis', 'Blandit', 'Vestibulum', 'Scelerisque', 'Egestas', 'Mi', 'Tellus', 'Quisque',
];

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
      const testTodos = getTestTodos();
      const testTodosLen = testTodos.length;
      const rndIndex = Math.floor(Math.random() * testTodosLen);
      const todoData = testTodos[rndIndex];

      self.events.publish('createTodo', Object.assign(todoData, { projectId: id }));
    }
  }

  editProject() {
    const self = this;
    const { options: { edited } } = self.data;

    if (edited) {
      self.module.editData({
        title: WORDS[Math.floor(Math.random() * WORDS.length)],
      });
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
