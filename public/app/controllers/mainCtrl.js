angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth)	{

	var vm = this;

	//	 get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

	//check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function()	{
		vm.loggedIn = Auth.isLoggedIn();

		//get user information on route change
		Auth.getUser().then( 
			function(data){
			vm.user = data;
		}); 
		//function(response){
		//	$location.path('/');
		//});
	});

	//fucntion to handle login form
	vm.doLogin = function()	{
		//processing Icon
			vm.processing = true;

		// clear error handling
		vm.error = '';

		// call the Auth.login() function
		Auth.login(vm.loginData.username, vm.loginData.password)
		.success(function(data)	{
			vm.processing = false;

		//if a user successfully logs in, redirect to users page
		if( data.success)
			$location.path('/users');
		else
			vm.error = data.message;
		});
}

	//function to handle loggin out
	vm.doLogout = function()	
	{
		Auth.Logout();
		//reset all user info
		vm.user = {};
		$location.path('/login');
	};
});