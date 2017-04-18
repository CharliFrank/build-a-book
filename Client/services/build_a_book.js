angular.module('app.build_a_book', [])

.controller('BuildABookController', function ($window, $scope, $http) {
  console.log('inside guild book app ctl');
  console.log('inside guild book app ctl', $window.localStorage);

  $scope.showInput = false;
  $scope.buttonClicked = function () {
    console.log('getting clicked');
    $scope.showInput = !$scope.showInput;
  }

  $scope.savePage = function (text) {
    console.log(text);
    return $http({
      method: 'POST',
      url: '/add_a_page',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: $window.localStorage.user,
        password: $window.localStorage.password,
        page: text,
      }
    }).then(function successCallback(response) {
      console.log(response.data);
      return response;
    }, function errorCallback(error) {
      console.error(error, 'ERROR!!!!!!!!!!!!!!!!!!!!!!!');
    });
  };
});
