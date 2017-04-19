const app = angular.module('app', [
  'app.services',
  'app.build_a_book',
  'app.my_books',
  // 'ngAnimate',
  // 'textAngular',
  'ngRoute',
]);

app.config(($routeProvider) => {
  $routeProvider
    .when('/signup', {
      templateUrl: 'views/signup.ejs',
      controller: 'MainAppController',
    })
    .when('/login', {
      templateUrl: 'views/login.ejs',
      controller: 'MainAppController',
    })
    .when('/my_books', {
      templateUrl: 'views/my_books.ejs',
      controller: 'MyBooksController',
    })
    .when('/build_a_book', {
      templateUrl: 'views/build_a_book.ejs',
      controller: 'BuildABookController',
    })
    .otherwise({
      redirectTo: '/#/build_a_book',
    });
});

app.directive('backImg', function(){
     var linkFn;
    linkFn = function(scope, element, attrs) {
        var animateDown, animateRight, pageOne, pageTwo;
        pageOne = angular.element(element.children()[0]);
        pageTwo = angular.element(element.children()[1]);

        animateDown = function() {
            $(this).animate({
                top: '+=50'
            });
        };

        animateRight = function() {
            $(this).animate({
                left: '+=50'
            });
        };

        $(pageOne).on('click', animateDown);
        $(pageTwo).on('click', animateRight);
    };
    return {
        restrict: 'E',
        link: linkFn
    };
    // return function(scope, element, attrs){
    //     var url = attrs.backImg;
    //     element.css({
    //         'background-image': 'url(' + url +')',
    //         'background-size' : 'cover'
    //     });
    // };
});

