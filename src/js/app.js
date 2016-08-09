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

smoothScroll.init({
  selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
  selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
  speed: 1000, // Integer. How fast to complete the scroll in milliseconds
  easing: 'easeInOutQuad', // Easing pattern to use
  offset: 50, // Integer. How far to offset the scrolling anchor location in pixels
  updateURL: true, // Boolean. If true, update the URL hash on scroll
  callback: function ( anchor, toggle ) {} // Function to run after scrolling
});