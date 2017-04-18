angular.module('app.build_a_book', [])

.controller('BuildABookController', function ($scope) {
  console.log('inside guild book app ctrl');
  $scope.message = 'Your controller is working! buildABookController';
  $scope.savePage = function (text) {
    console.log(text);
  }
});
