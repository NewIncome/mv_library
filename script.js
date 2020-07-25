/* eslint-disable no-unused-vars */

const myLibrary = [];
// localStorage.setItem('myLibrary', myLibrary);
let countId = 1;
const bookForm = document.getElementById('bookForm');
const title = document.getElementById('formTitle');
const author = document.getElementById('formAuthor');
const pages = document.getElementById('formPages');
const read = document.getElementById('formRead');


function Book(title, author, numPages, read = false) {
  this.id = countId;
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.read = read;
  countId += 1;
}

function lStorageTOmLibrary(id) {
  const keysVar = localStorage.getItem('keys').split(',');
  const valueVar = localStorage.getItem(id).split(',');
  console.log(valueVar);
  const obj = {};
  keysVar.forEach((key, i) => {
    obj[key] = valueVar[i];
  });
  console.log('obj.id: ', obj.id);
  if (myLibrary.push(obj)) return true;
  return false;
}

function populateMyLib() {
  const sortedLocalStorageKeys = Object.keys(localStorage).sort((a, b) => a - b);
  sortedLocalStorageKeys.forEach((lKey) => {
    console.log('lKey: ' + lKey);
    if ((/\d/).test(lKey)) lStorageTOmLibrary(lKey);
  });
}

function addBookToLibrary(title, author, numPages, read = false) {
  console.log('countId: ' + countId);
  const book = new Book(title, author, numPages, read);
  if (localStorage.length === 0) localStorage.setItem('keys', Object.keys(book)); // to get the att
  localStorage.setItem('bookCount', countId); // save track of the current bookId count
  localStorage.setItem(book.id, Object.values(book));
  if (lStorageTOmLibrary(book.id)) return true;

  return false;
}

// DOM Manipulation
function render() {
  const divBookShelf = document.getElementById('bookshelf');
  while (divBookShelf.firstChild) {
    divBookShelf.removeChild(divBookShelf.firstChild);
  }
  const orderedLib = [...myLibrary];
  orderedLib.reverse().forEach(book => {
    const {
      id, author, title, numPages, read,
    } = book;
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
    removeButton.setAttribute('onClick', `removeBookFromLibraryNlStorage(${id})`);

    const readButton = document.createElement('button');
    readButton.innerHTML = `Mark as ${read ? 'not read' : 'read'}`;
    readButton.setAttribute('onClick', `readBook(${id})`);

    bookContainer.appendChild(divBook);
    bookContainer.appendChild(removeButton);
    bookContainer.appendChild(readButton);

    divBookShelf.appendChild(bookContainer);
  });
}

function removeBookFromLibraryNlStorage(bookId) {
  const index = myLibrary.findIndex(bookElem => +bookElem.id === bookId);
  console.log(typeof index, index);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    localStorage.removeItem(index + 1);
    render();
  }
}

const readBook = (bookId) => {
  const foundBook = myLibrary.find(bookElem => bookElem.id === bookId);
  foundBook.read = !foundBook.read;
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
  addBookToLibrary('National Geographic: The Photographs', 'Leah Bendavid-Val', 336);
  addBookToLibrary('Setting the Family Free', 'Eric D. Goodman', 310);
  addBookToLibrary('Sea of Ink : A Creative Writing Anthology ', 'Niamh King', 248);
  addBookToLibrary('What the Dinosaurs Did Last Night ', 'Refe Tuma and Susan Tuma', 112);
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
  addBookToLibrary(title.value, author.value, pages.value, read.checked);
  render();
  clearInputs();
}

bookForm.addEventListener('submit', saveBook);

if (localStorage.length === 0) {
  displayDefaultBooks();
} else {
  countId = localStorage.getItem('bookCount');
  populateMyLib();
  render();
}

// ========== Snippet to check Size of localStorage ==========
// to be used in the browser console
var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
// // same but in multiple lines
// var _lsTotal = 0,
//     _xLen, _x;
// for (_x in localStorage) {
//     if (!localStorage.hasOwnProperty(_x)) {
//         continue;
//     }
//     _xLen = ((localStorage[_x].length + _x.length) * 2);
//     _lsTotal += _xLen;
//     console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
// };
// console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");