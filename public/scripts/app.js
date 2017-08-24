/*intializing the app rooot */

var autoSuggestApp = angular.module('autoSuggestApp', ['ui.router']);

autoSuggestApp.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('/',{
			url : '/',
			templateUrl: 'public/views/home.html'
		});
});