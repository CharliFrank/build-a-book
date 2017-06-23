angular.module('app.build_a_book', [])

.controller('BuildABookController', function ($window, BookService, Auth) {
  this.showInput = false;
  this.title = undefined;
  this.myBook = [];

  this.create = function () {
    this.showInput = BookService.bookBuilder(this.showInput);
  };

  this.enterTitle = function (title) {
    this.title = title;
    BookService.bookTitle(title);
  };

  this.savePage = function (page) {
    this.myBook = this.myBook.concat([page]);
    BookService.addPage(page);
    this.narration.text = '';
  };

  this.addToMyBooks = async function () {
    if (!this.title) {
      this.title = prompt('Hey, Dont forget to add a title!');
      BookService.bookTitle(this.title);
      this.addToMyBooks();
    } else {
      await BookService.addBook();
      this.myBooksPage();
    }
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
