var app = angular.module('FoundersMapQuest', ['leaflet-directive','ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'views/main.html'
	})
	.when('/map', {
		controller: 'MapController',
		templateUrl: 'views/map.html'
	})
	.otherwise({
		templateUrl: 'views/main.html'
	});
});

app.config(function($logProvider){
	$logProvider.debugEnabled(false);
});