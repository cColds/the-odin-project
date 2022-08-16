export default class FormBookController {
  constructor(module, view) {
    const self = this;
    self.module = module;
    self.view = view;

    // Events
    self.module.events
      .subscribe('render', () => self.onRender());
  }

  inputCheck(inputId, value, options) {
    const self = this;

    self.module.inputCheck(inputId, value, options);
  }

  checkForm(showErors = false) {
    const self = this;
    const { inputs } = self.view.elements;

    self.module.checkForm(inputs, showErors);
  }

  onInputText(inputId, event) {
    const self = this;
    const { inputs } = self.view.elements;
    const { target: { value }, key, type } = event;

    if (((value === '' || value[value.length - 1] === ' ') && key === ' ')) {
      event.preventDefault();
    }

    if (event.target.type === 'number' && key.length === 1 && !key.match(/\d/)) {
      event.preventDefault();
    }

    if (event.target.type === 'number' && value === '0') {
      if (key === '0') {
        event.preventDefault();
      } else {
        inputs[inputId].input.value = '';
      }
    }

    if (type === 'keyup') {
      self.module.inputCheck(inputId, value, inputs[inputId].options);
    }
  }

  onSubmit() {
    const self = this;
    const { inputs } = self.view.elements;
    const inputsKeys = Object.keys(inputs);
    const values = {};

    self.checkForm(true);

    if (self.module.isValid) {
      for (let i = 0; i < inputsKeys.length; i += 1) {
        const { input } = inputs[inputsKeys[i]];

        if (input.type === 'checkbox') {
          values[inputsKeys[i]] = inputs[inputsKeys[i]].input.checked;
        } else if (input.type === 'number') {
          values[inputsKeys[i]] = Number(inputs[inputsKeys[i]].input.value);
        } else {
          values[inputsKeys[i]] = inputs[inputsKeys[i]].input.value;
        }
      }

      if (values['book-pages-read'] > values['book-total-pages']) {
        values['book-pages-read'] = values['book-total-pages'];
      }

      self.module.params?.callback({
        title: values['book-title'],
        author: values['book-author'],
        pagesRead: values['book-pages-read'],
        totalPages: values['book-total-pages'],
        isRead: values['book-is-read'],
      });
    }
  }

  onRender() {
    const self = this;
    const { form } = self.view.elements;
    const {
      inputs: {
        'book-title': bookTitle,
        'book-author': bookAuthor,
        'book-pages-read': bookPagesRead,
        'book-total-pages': bookTotalPages,
      },
    } = self.view.elements;

    bookTitle.input.addEventListener('keydown', (e) => self.onInputText('book-title', e));
    bookTitle.input.addEventListener('keyup', (e) => self.onInputText('book-title', e));
    bookTitle.input.addEventListener('blur', ({ target: { value } }) => self.inputCheck('book-title', value, bookTitle.options));

    bookAuthor.input.addEventListener('keydown', (e) => self.onInputText('book-author', e));
    bookAuthor.input.addEventListener('keyup', (e) => self.onInputText('book-author', e));
    bookAuthor.input.addEventListener('blur', ({ target: { value } }) => self.inputCheck('book-author', value, bookAuthor.options));

    bookPagesRead.input.addEventListener('keydown', (e) => self.onInputText('book-pages-read', e));
    bookPagesRead.input.addEventListener('keyup', (e) => self.onInputText('book-pages-read', e));
    bookPagesRead.input.addEventListener('blur', ({ target: { value } }) => self.inputCheck('book-pages-read', value, bookPagesRead.options));

    bookTotalPages.input.addEventListener('keydown', (e) => self.onInputText('book-total-pages', e));
    bookTotalPages.input.addEventListener('keyup', (e) => self.onInputText('book-total-pages', e));
    bookTotalPages.input.addEventListener('blur', ({ target: { value } }) => self.inputCheck('book-total-pages', value, bookTotalPages.options));

    form.addEventListener('input', () => self.checkForm());
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      self.onSubmit();
    });

    self.checkForm(false);
  }
}
