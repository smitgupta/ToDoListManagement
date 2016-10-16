var ToDoApp = [];
ToDoApp.UIGrid = [];

ToDoApp.controllers = angular.module('controllers',[]);
ToDoApp.Dependencies = ['controllers'];

ToDoApp.UIGrid.Dependencies = ['ui.router','ui.grid','ui.grid.edit','ui.grid.autoResize'];

angular.module('ToDo_App',ToDoApp.Dependencies.concat(ToDoApp.UIGrid.Dependencies))
.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){
	
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider.state('home',
							{
								url: '/home',
								templateUrl: 'templates/PRTL_Home.html',
								controller: 'CTRL_Home',
								controllerAs: 'homeCtrl'
							});
}]);