angular.module('app.build_a_book', [])

.controller('BuildABookController', function ($window, BookService, Auth) {
  this.showInput = false;
  this.title = undefined;
  this.myBook = [];
  this.pic = '';
  this.pageBackgrounds = [
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

  this.pageBackgroundChoices = [
    'Colorful Background',
    'Flower Background',
    'Sunset',
    'Candy Mountain',
    'Daffy Duck',
    'Fake Teeth',
    'Forrest',
    'Gingerbread House',
    'Meadow',
    'Mystery Machine',
    'Fairytale Background'];

  this.savePageBackgrounds = [];

  this.create = function () {
    this.showInput = BookService.bookBuilder(this.showInput);
  };

  this.changePhoto = function (index) {
    this.pic = this.pageBackgrounds[index];
  };

  this.enterTitle = function (title) {
    this.title = title;
    BookService.bookTitle(title);
  };

  this.savePage = function (page) {
    if (!this.pic) {
      this.pic = this.pageBackgrounds[Math.floor(Math.random() * 11)];
    }
    this.myBook = this.myBook.concat([page]);
    this.savePageBackgrounds = this.savePageBackgrounds.concat([this.pic]);
    BookService.addPage(page);
    this.narration.text = '';
  };

  this.addToMyBooks = async function () {
    if (!this.title) {
      this.title = prompt('Hey, Dont forget to add a title!');
      BookService.bookTitle(this.title);
      this.addToMyBooks();
    } else {
      await BookService.addBook(this.savePageBackgrounds);
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
