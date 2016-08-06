var app = angular.module('FoundersMapQuest', ['leaflet-directive','ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'views/main.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.config(function($logProvider){
	$logProvider.debugEnabled(false);
});