angular.module('app.services', [])

.controller('MainAppController', function ($scope, $window) {
  console.log('inside my books app ctrl');
  $scope.message = 'Your controller is working! MyMainController';
  $scope.usernameInfo = function (user, pword) {
    console.log('inside func', user, pword);
    $window.localStorage.setItem('user', user);
    $window.localStorage.setItem('password', pword);
  };
});

