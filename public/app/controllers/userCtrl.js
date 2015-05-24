//inject the stuff service into main Angular module

angular.module('userCtrl',['userService'])
	
//create a controller and inject the Stuff factory
.controller('userController',function(User)	{
	
	var vm = this;

	//	set a processing variable to show loading things
	vm.processing = this;


	//	set a processing variable to show loading things
	vm.processing = true;

	//	grab all the users at page load

	User.all()
	.success(function(data)	{
	
	//	when all the users come back, remove the processing variable
		vm.processing = false;
		//bind the data to a controller bariable
		//this come from the stuffService
		vm.users = data;
	});
});