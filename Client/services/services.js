angular.module('app.services', [])

.controller('MainAppController', function ($scope, $window) {
  $scope.message = 'Your controller is working! MyMainController';
  $scope.usernameInfo = function (user, pword) {
    $window.localStorage.setItem('user', user);
    $window.localStorage.setItem('password', pword);
  };
});

