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

function removeBookFromLibrary(book) {
  let index = myLibrary.findIndex(bookElem => bookElem.id === book.id)
  if (index == -1)
    return false
  else {
    myLibrary.splice(index, 1)
    return true
  }
}

function displayDefaultBooks() {
  addBookToLibrary('National Geographic: The Photographs', 'Leah Bendavid-Val', 336);
  addBookToLibrary('Setting the Family Free', 'Eric D. Goodman', 310);
  addBookToLibrary('Sea of Ink : A Creative Writing Anthology ', 'Niamh King', 248);
  addBookToLibrary('What the Dinosaurs Did Last Night ', 'Refe Tuma and Susan Tuma', 112);
  render();
}

// DOM Manipulation
function render() {
  let remove = document.getElementById("bookshelf");
  while (remove.firstChild) {
    remove.removeChild(remove.firstChild);
  }
  myLibrary.forEach(book => {
    const div = document.createElement('div'); // to create the book div
    div.classList.add('book');

    const divTitle = document.createElement('h3'); // to create the book title
    divTitle.innerHTML = book.title;
    div.appendChild(divTitle);

    const divAuthor = document.createElement('p'); // to create the author
    divAuthor.innerHTML = book.author;
    div.appendChild(divAuthor);

    const divPages = document.createElement('p'); // to create the pages
    divPages.innerHTML = book.numPages + ' pages';
    div.appendChild(divPages);

    const divRead = document.createElement('p'); // to create the read text
    divRead.innerHTML = book.read ? 'Read' : 'Not read';
    div.appendChild(divRead);

    document.getElementById('bookshelf').appendChild(div);
    
    const removeButton=document.createElement('button')
    removeButton.innerHTML='Delete'
    document.getElementById('bookshelf').appendChild(removeButton);
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