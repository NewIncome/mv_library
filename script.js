/* eslint-disable no-unused-vars, max-classes-per-file */

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
  Book.countId = 0;
  constructor(author, title, numPages, read = false) {
    this.id = countId;
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
    Book.countId += 1;
  }

  // function to define if a book is read or not
  readBook() {
    this.read = !this.read;
  }
}

const lib = new Library();
console.log(lib);

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