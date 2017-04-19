angular.module('app.my_books', [])

.controller('MyBooksController', function ($scope, $window, $http) {
  console.log('inside my books app ctrl');
  $scope.message = 'Your controller is working! MyBooksController';
  $scope.myBook = [];
  $scope.showInput = false;
  
  $scope.click = function (event) {

    console.log(event);
    var tempArr = [];
    $scope.myBooks.map(book => {
      if (book[0] === event) {
        console.log(book);
        $scope.bookTitle = event;
        $scope.showInput = !$scope.showInput;
        for (let key in book) {
          if (Number(key)) {
            $scope.myBook.push(book[key]);
          }
        }
      }
    });
    setTimeout(function () {
      $scope.book();
    }, 0);
  };

  $scope.book = function () {
    $("#flipbook").turn({
      width: 400,
      height: 300,
      autoCenter: true,
    });
  };

  $scope.getBooks = function () {
    console.log('get books func');
      return $http({
        method: 'GET',
        url: '/get_books',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          username: $window.localStorage.user,
          password: $window.localStorage.password,
          book: $scope.book,
        },
      }).then(function successCallback(response) {
        $scope.objMap(response.data);
        return response.data;
      }, function errorCallback(error) {
        console.error(error, 'ERROR!!!!!!!!!!!!!!!!!!!!!!!');
      });
  };

  $scope.init = function () {
    setTimeout(function () {
       $scope.getBooks();
    }, 500);

  };

  $scope.objMap = function (array) {
    let obj = {};
    const res = [];
    array.forEach(arr => {
      arr.forEach((page, index) => {
        obj[index] = page;
        if (index === arr.length - 1) {
          res.push(obj);
          obj = {};
        }
      });
    });
    $scope.myBooks = res;
  };
});

