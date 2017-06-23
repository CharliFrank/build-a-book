angular.module('app.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  console.log('inside auth controller');

  this.login = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('book.token', token);
        $location.path('/build_a_book');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  this.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('book.token', token);
        $location.path('/build_a_book');
      })
      .catch(function (error) {
        console.error(error, 'error');
      });
  };
});
