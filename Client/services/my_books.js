angular.module('app.my_books', [])

.controller('MyBooksController', function ($scope) {
  console.log('inside my books app ctrl');
  $scope.message = 'Your controller is working! MyBooksController';
});
