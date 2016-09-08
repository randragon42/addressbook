//Angular app declaration
var app = angular.module('app', ['ngRoute', 'angularModalService']);

app.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when('/', {
            controller: 'addressBookCtrl',
            templateUrl: 'templates/address_book.html'
        })
        .when('/edit_contacts', {
            controller: 'editContactsCtrl',
            templateUrl: 'templates/editContacts.html'
        })
        .otherwise('/');
}]);


