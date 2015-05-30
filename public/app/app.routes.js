angular.module('app.routes', ['ngRoute'])
// configure our routes
.config(function($routeProvider, $locationProvider) {

    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/app/views/pages/home.html'
        })

        //login page
        .when('/login', {
            templateUrl : '/app/views/pages/login.html',
        	controller   : 'mainController',
        	controllerAs   : 'login'
        })

        //show all users
        .when('/users',{
            templateUrl: 'app/views/pages/users/all.html',
            controller: 'userController',
            controllerAs: 'user'
        });
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);
});
