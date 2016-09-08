//Angular app declaration
var app = angular.module('app', ['ngRoute', 'angularModalService', 'ngStorage']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'addressBookCtrl',
            templateUrl: 'templates/address_book.html'
        })
        .when('/about', {
            controller: '',
            templateUrl: 'templates/about.html'
        })
        .otherwise('/');
}]);


