angular.module('app.my_books', [])

.controller('MyBooksController', function ($scope, $window, Auth, BookService) {
  console.log('inside my books app ctrl');
  this.showInput = false;
  this.myBooks = [];
  this.pageBackgrounds = [];
  this.background = '';
  this.titleBackgrounds = [
    './images/app_background.jpeg',
    './images/background.jpeg',
    './images/beach_with_sunset.jpeg',
    './images/candy_mountain.jpeg',
    './images/daffy_duck.png',
    './images/false_teeth.jpeg',
    './images/forrest.jpeg',
    './images/gingerbread_house.jpeg',
    './images/meadow.jpeg',
    './images/mystery_machine.jpeg',
    './images/storybook_background.png'];

  this.getMyBooks = async function () {
    this.myBooks = await BookService.getBooks();
    this.getBackground();
  };

  this.getBackground = function () {
    this.background = this.titleBackgrounds[Math.floor(Math.random() * 11)];
  };

  this.showBook = async function (title) {
    await this.myBooks.forEach((book) => {
      if (book[0] === title) {
        this.bookTitle = title;
        this.showInput = !this.showInput;
        this.reading = Object.values(book).slice(1);
        this.pageBackgrounds = this.reading.slice(this.reading.length - 1);
        this.reading.pop();
        console.log(this.pageBackgrounds);
      }
    });
    $('#flipbook').turn({
      width: 400,
      height: 300,
      autoCenter: true,
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
