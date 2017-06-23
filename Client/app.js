const app = angular.module('app', [
  'app.auth',
  'app.build_a_book',
  'app.my_books',
  'book.service',
  'ngRoute',
]);

app.config(($routeProvider, $httpProvider) => {
  $routeProvider
    .when('/signup', {
      templateUrl: 'views/signup.ejs',
    })
    .when('/login', {
      templateUrl: 'views/login.ejs',
    })
    .when('/my_books', {
      templateUrl: 'views/my_books.ejs',
      authenticate: true,
    })
    .when('/build_a_book', {
      templateUrl: 'views/build_a_book.ejs',
      authenticate: true,
    })
    .otherwise({
      redirectTo: '/signup',
    });

  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  const attach = {
    request: (object) => {
      const jwt = $window.localStorage.getItem('book.token');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    },
  };

  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
});
