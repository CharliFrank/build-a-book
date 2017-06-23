angular.module('book.service', [])

.factory('BookService', function ($window, $http, $location) {
  this.currentBook = [];
  this.books = [];

  const bookBuilder = bool => !bool;

  const bookTitle = (title) => {
    this.currentBook.unshift(title);
  };

  const addPage = (page) => {
    this.currentBook.push(page);
  };

  const changePage = (page) => {
    $location.path(`/${page}`);
  };

  const getBooks = function () {
    console.log('get books func');
    return $http({
      method: 'GET',
      url: '/get_books',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': $window.localStorage.getItem('book.token'),
      },
    }).then((response) => {
      return ((array, res = []) => {
        let obj = {};
        array.forEach((arr) => {
          console.log(arr, 'arr')
          arr.forEach((page, index) => {
            obj[index] = page;
            if (index === arr.length - 1) {
              res.push(obj);
              obj = {};
            }
          });
        });
        console.log(res, 'res');
        this.books = res;
        return res;
      })(response.data);
    }, (error) => {
      console.error(error, 'ERROR!!!!!!!!!!!!!!!!!!!!!!!');
    });
  };

  const addBook = () => {
    console.log('send book func');
    $http({
      method: 'POST',
      url: '/add_a_book',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': $window.localStorage.getItem('book.token'),
      },
      data: {
        book: this.currentBook,
      },
    })
      .then(response => response, error => error);
  };

  const deleteBook = (title) => {
    console.log('delet request');
    $http({
      method: 'DELETE',
      url: '/delete_a_book',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': $window.localStorage.getItem('book.token'),
      },
      params: {
        book: title,
      },
    })
      .then(response => response, error => error);
      // .then((response) => {
      //   console.log(response.data);
      //   return true;
      // }, (rejection) => {
      //   console.log(rejection.data);
      //   return false;
      // });
  };

  return {
    bookBuilder,
    bookTitle,
    addPage,
    addBook,
    changePage,
    getBooks,
    deleteBook,
  };
})
.factory('Auth', ($http, $location, $window) => {
  const signin = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: user,
    })
    .then(resp => resp.data.token);
  };

  const signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: user,
    })
    .then(resp => resp.data.token);
  };

  const isAuth = function () {
    return !!$window.localStorage.getItem('book.token');
  };

  const signout = function () {
    console.log('signing out');
    $window.localStorage.removeItem('book.token');
    $location.path('/login');
  };

  return {
    signin,
    signup,
    isAuth,
    signout,
  };
});
