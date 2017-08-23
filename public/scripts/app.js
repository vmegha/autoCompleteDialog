/*intializing the app rooot */

var musicApp = angular.module('musicApp', ['ui.router']);

musicApp.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('/',{
			url : '/',
			templateUrl: 'views/home.html'
		});
});