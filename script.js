/* eslint-disable no-unused-vars, max-classes-per-file */

// Global variable
let bookNum = 1;

// Class to create/have a Library
class Library {
  constructor(name) {
    this.name = name;
    this.collection = [];
  }

  // Add a book to the Library obj
  addBookToLibrary(book) {
    if (this.collection.push(book)) return true;
    return false;
  }
}

// Class to create Books
class Book {
  constructor(author, title, numPages, read = false) {
    this.id = bookNum;
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
    bookNum += 1;
  }

  // function to define if a book is read or not
  readBook() {
    this.read = !this.read;
  }
}

Book.prototype.varb = 0;

const lib = new Library();
console.log(lib);

const b1 = new Book('', '', 11);
const b2 = new Book('', '', 12);
console.log(b1, b2);

/*
let lib = new Library();
*/

// ------------------- DOM -------------------
// Class to create a DOM element needed for the render() in HTML
// class Dom {
//   constructor(name, tag) {
//     this.name = name;
//     return document.getElementById(tag);
//   }

//   // Methods available to these DOM objects
//   addClass = (className) => {
//     console.log(className);
//     // this.classList.add(className);
//   }
// };
// let bookForm = new Dom('book', 'bookForm');
// console.log();

// let t1 = new Dom('t1', 'bookForm');
// t1.addClass('testing');