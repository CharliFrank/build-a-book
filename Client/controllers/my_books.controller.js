angular.module('app.my_books', [])

.controller('MyBooksController', function ($scope, $window, Auth, BookService) {
  console.log('inside my books app ctrl');
  this.showInput = false;
  this.myBooks = [];

  this.getMyBooks = async function () {
    this.myBooks = await BookService.getBooks();
  };

  this.showBook = async function (title) {
    await this.myBooks.forEach((book) => {
      if (book[0] === title) {
        this.bookTitle = title;
        this.showInput = !this.showInput;
        this.reading = Object.values(book).slice(1);
      }
    });
    $('#flipbook').turn({
      width: 400,
      height: 300,
      autoCenter: false,
    });
  };

  this.showBooks = function () {
    $window.location.reload();
  };

  this.deleteBook = function () {
    BookService.deleteBook(this.bookTitle);
    $window.location.reload();
  };

  this.logout = function () {
    Auth.signout();
  };

  this.myBooksPage = function () {
    BookService.changePage('my_books');
  };

  this.buildBooksPage = function () {
    BookService.changePage('build_a_book');
  };
});
