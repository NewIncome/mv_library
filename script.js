let myLibrary = [];
let countId = 1

function Book(author, title, numPages, read) {
  this.id = countId
  this.author = author
  this.title = title
  this.numPages = numPages
  this.read = read
  countId++
}

function addBookToLibrary(book) {
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

//let book= new Book(all elements)
//if removeBookFromLibrary()
//remove the book from DOM