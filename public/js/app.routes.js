// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])

// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/pages/home.html',
            controller  : 'homeController',
            controllerAs: 'home'
        })

        // route for the about page
        .when('/signin', {
            templateUrl : 'views/pages/signin.html',
            controller  : 'signinController',
            controllerAs: 'signin'
        })

        // route for the contact page
        .when('/registration', {
            templateUrl : 'views/pages/registration.html',
            controller  : 'registrationController',
            controllerAs: 'registration'
        });

    $locationProvider.html5Mode(true);
});
