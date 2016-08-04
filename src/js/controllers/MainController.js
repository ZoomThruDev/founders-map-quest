app.controller('MainController', ['$scope', '$timeout', 'leafletData', function($scope, $timeout, leafletData){

  angular.extend($scope, {
    mapCenter: {
      lat: 51.505,
      lng: -0.09,
      zoom: 4
    },
    defaults: {
      tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
      zoomControlPosition: 'topright',
      tileLayerOptions: {
        opacity: 0.9,
        detectRetina: true,
        reuseTiles: true,
      },
      scrollWheelZoom: false
    }
  });

  // default variables
  $scope.csvData = "";
  $scope.delimiter = ",";
  $scope.startups = [];
  $scope.dataLat = "Garage Latitude";
  $scope.dataLng = "Garage Longitude";

  $scope.showMap = false;
  $scope.$watch("showMap", function(value) {
    if (value === true) {
      leafletData.getMap().then(function(map) {
        $timeout(function() {
          map.invalidateSize();
        }, 300);
      });
    }
  });

  $scope.$watchGroup(["delimiter", "csvData"], function() {
  
    var lines, data, length, place;
    $scope.startups = [];
    $scope.places = [];
    lines = $scope.csvData.split('\n');
    
    for (var i = lines.length - 1; i >= 0; i--) {
      places = [];
      line = lines[i];
      data = line.split($scope.delimiter);

      var name = data[0];
      var lat = data[1];
      var lng = data[2];

      $scope.startups.push({
        name: name,
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
    }
    if (!isNaN($scope.startups[0].lat)) {
      $scope.showMap = true;
      $scope.mapMarkers = dataToMarkers($scope.startups);
    };
    
  });

}]);