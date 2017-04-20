angular.module('app.build_a_book', [])

.controller('BuildABookController', function ($window, $scope, $http) {
  $scope.showInput = false;
  $scope.bookTitle = '';
  $scope.book = [];

    $scope.clearSearch = function () {
        $scope.narration.text = "";
    };

  $scope.buttonClicked = function () {
    $scope.bookTitle = prompt('What Is The Title Of Your Book?');
    $scope.showInput = !$scope.showInput;
    $scope.book.push($scope.bookTitle);
  };

  $scope.savePage = function (text) {
    $scope.clearSearch();
    $scope.book.push(text);
  };

  $scope.sendBook = function () {
    console.log('send book func');
    return $http({
      method: 'POST',
      url: '/add_a_page',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: $window.localStorage.user,
        password: $window.localStorage.password,
        book: $scope.book,
      },
    }).then(function successCallback(response) {
      console.log(response.data);
      return response;
    }, function errorCallback(error) {
      console.error(error, 'ERROR!!!!!!!!!!!!!!!!!!!!!!!');
    });
  };
});
