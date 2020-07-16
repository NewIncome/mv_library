/* eslint-disable no-unused-vars */

const bookForm = document.getElementById('bookForm');
const title = document.getElementById('formTitle');
const author = document.getElementById('formAuthor');
const pages = document.getElementById('formPages');
const read = document.getElementById('formRead');

class Book {
  static countId = 0;
  constructor(title, author, numPages, read = false) {
    this.id = ++Book.countId;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }

  readBook() {
    this.read = !this.read;
  }
}

const myLibrary = (() => {
  books = [];

  const addBookToLibrary = (title, author, numPages, read = false) => {
    const book = new Book(title, author, numPages, read);
    if (books.push(book)) return true;

    return false;
  };

  const removeBookFromLibrary = (bookId) => {
    const index = books.findIndex((bookElem) => bookElem.id === bookId);

    if (index !== -1) {
      books.splice(index, 1);
      render();
    }
  };

  return {
    addBookToLibrary,
    removeBookFromLibrary,
    books,
  };
})();

// DOM Manipulation
function render() {
  const divBookShelf = document.getElementById('bookshelf');
  while (divBookShelf.firstChild) {
    divBookShelf.removeChild(divBookShelf.firstChild);
  }

  myLibrary.books.forEach((book) => {
    const { id, author, title, numPages, read } = book;
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');

    const divBook = document.createElement('div'); // to create the book div
    divBook.classList.add('book');

    const divTitle = document.createElement('h3'); // to create the book title
    divTitle.innerHTML = title;
    divBook.appendChild(divTitle);

    const divAuthor = document.createElement('p'); // to create the author
    divAuthor.innerHTML = author;
    divBook.appendChild(divAuthor);

    const divPages = document.createElement('p'); // to create the pages
    divPages.innerHTML = `${numPages} pages`;
    divBook.appendChild(divPages);

    const divRead = document.createElement('p'); // to create the read text
    divRead.innerHTML = read ? 'Read' : 'Not read';
    divBook.appendChild(divRead);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = 'Delete';
    removeButton.setAttribute('onClick', `myLibrary.removeBookFromLibrary(${id})`);

    const readButton = document.createElement('button');
    readButton.innerHTML = `Mark as ${read ? 'not read' : 'read'}`;
    readButton.setAttribute('onClick', `readBook(${id})`);

    bookContainer.appendChild(divBook);
    bookContainer.appendChild(removeButton);
    bookContainer.appendChild(readButton);

    divBookShelf.appendChild(bookContainer);
  });
}

const readBook = (bookId) => {
  const foundBook = myLibrary.books.find((bookElem) => bookElem.id === bookId);
  foundBook.readBook();
  render();
};

const toggleForm = () => {
  if (bookForm.attributes.class.value === 'hidden') {
    bookForm.attributes.class.value = 'block';
  } else {
    bookForm.attributes.class.value = 'hidden';
  }
};

function displayDefaultBooks() {
  myLibrary.addBookToLibrary(
    'National Geographic: The Photographs',
    'Leah Bendavid-Val',
    336
  );
  myLibrary.addBookToLibrary('Setting the Family Free', 'Eric D. Goodman', 310);
  myLibrary.addBookToLibrary(
    'Sea of Ink : A Creative Writing Anthology ',
    'Niamh King',
    248
  );
  myLibrary.addBookToLibrary(
    'What the Dinosaurs Did Last Night ',
    'Refe Tuma and Susan Tuma',
    112
  );
  render();
}

const clearInputs = () => {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
};

function saveBook(e) {
  e.preventDefault();
  myLibrary.addBookToLibrary(
    title.value,
    author.value,
    pages.value,
    read.checked
  );
  render();
  clearInputs();
}

bookForm.addEventListener('submit', saveBook);
displayDefaultBooks();
