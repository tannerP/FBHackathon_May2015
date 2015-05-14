//inject the stuff service into main Angular module

angular.module('myApp',['userServices'])
	
//create a controller and inject the Stuff factory
.controller('userController',function(Stuff)	{
	var vm = this;

	//get all the stuff
	Stuff.all();

	//promise object

	success(function)(data)	{
		//bind the data to a controller bariable
		//this come from the stuffService
		vm.stuff = data;
	}
});