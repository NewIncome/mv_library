let myLibrary = [];
let countId = 1
const bookForm = document.getElementById("bookForm");
let title = document.getElementById('formTitle');
let author = document.getElementById('formAuthor');
let pages = document.getElementById('formPages');
let read = document.getElementById('formRead');


function Book(title, author, numPages, read = false) {
  this.id = countId
  this.author = author
  this.title = title
  this.numPages = numPages
  this.read = read
  countId++
}

function addBookToLibrary(title, author, numPages, read = false) {
  let book = new Book(title, author, numPages, read);
  if (myLibrary.push(book)) return true

  return false
}

function removeBookFromLibrary(book_id) {
  let index = myLibrary.findIndex(bookElem => bookElem.id === book_id)

  if (index != -1) {
    myLibrary.splice(index, 1)
    render()
    // return true
  }

  // return false


}

function displayDefaultBooks() {
  addBookToLibrary('National Geographic: The Photographs', 'Leah Bendavid-Val', 336);
  addBookToLibrary('Setting the Family Free', 'Eric D. Goodman', 310);
  addBookToLibrary('Sea of Ink : A Creative Writing Anthology ', 'Niamh King', 248);
  addBookToLibrary('What the Dinosaurs Did Last Night ', 'Refe Tuma and Susan Tuma', 112);
  render();
}


const readBook = (book_id) => {
  let found_book = myLibrary.find(bookElem => bookElem.id === book_id)
  found_book.read = !found_book.read
  render()
}

// DOM Manipulation
function render() {
  let divBookShelf = document.getElementById("bookshelf");
  while (divBookShelf.firstChild) {
    divBookShelf.removeChild(divBookShelf.firstChild);
  }

  myLibrary.forEach(book => {
    const bookContainer = document.createElement('div')
    bookContainer.classList.add('book-container')

    const divBook = document.createElement('div'); // to create the book div
    divBook.classList.add('book');

    const divTitle = document.createElement('h3'); // to create the book title
    divTitle.innerHTML = book.title;
    divBook.appendChild(divTitle);

    const divAuthor = document.createElement('p'); // to create the author
    divAuthor.innerHTML = book.author;
    divBook.appendChild(divAuthor);

    const divPages = document.createElement('p'); // to create the pages
    divPages.innerHTML = book.numPages + ' pages';
    divBook.appendChild(divPages);

    const divRead = document.createElement('p'); // to create the read text
    divRead.innerHTML = book.read ? 'Read' : 'Not read';
    divBook.appendChild(divRead);


    const removeButton = document.createElement('button')
    removeButton.innerHTML = 'Delete'
    removeButton.setAttribute("onClick", `removeBookFromLibrary(${book.id})`);

    const read_button = document.createElement('button')
    read_button.innerHTML = `Mark as ${book.read ? 'not read' : 'read'}`
    read_button.setAttribute("onClick", `readBook(${book.id})`);

    bookContainer.appendChild(divBook);
    bookContainer.appendChild(removeButton);
    bookContainer.appendChild(read_button);

    divBookShelf.appendChild(bookContainer);


  });
}


function saveBook(e) {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, read.checked);
  render();
  clearInputs()
}

const clearInputs = () => {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

bookForm.addEventListener('submit', saveBook);
displayDefaultBooks();