
const app = angular.module('app', [
  'app.services',
  'app.build_a_book',
  'app.my_books',
  'ngRoute',
]);

app.config(($routeProvider) => {
  $routeProvider
    .when('/signup', {
      templateUrl: 'views/signup.ejs',
      controller: 'MainAppController',
    })
    .when('/login', {
      templateUrl: 'views/login.ejs',
      controller: 'MainAppController',
    })
    .when('/my_books', {
      templateUrl: 'views/my_books.ejs',
      controller: 'MyBooksController',
    })
    .when('/build_a_book', {
      templateUrl: 'views/build_a_book.ejs',
      controller: 'BuildABookController',
    })
    .otherwise({
      redirectTo: '/#/build_a_book',
    });
});

