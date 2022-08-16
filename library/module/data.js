export default {
  getDefaultBooks: async () => {
    const data = await fetch('./data/books.json');
    const res = await data.json();

    return res.books;
  },

  getBooks: () => {
    const data = localStorage.getItem('books');
    const res = JSON.parse(data);

    return res;
  },

  saveBooks: (books) => {
    localStorage.setItem('books', JSON.stringify(books));
  },
};
