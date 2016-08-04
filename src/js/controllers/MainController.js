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

  $scope.$watchGroup(["delimiter", "csvData", "dataLat", "dataLng"], function() {
  
    var lines, data, length, place, indexLat, indexLng;
    $scope.startups = [];
    $scope.places = [];
    lines = $scope.csvData.split('\n');

    if ($scope.csvData.length) {
      toggleVisibility('#delimiter', 'show');
    };

    // we parse first row like head
    $scope.heading = lines[0].split($scope.delimiter);

    if($scope.heading.length > 1) {
      indexLat = $scope.heading.indexOf($scope.dataLat);
      indexLng = $scope.heading.indexOf($scope.dataLng);
    }
    
    // begin from index 1 to avoid header
    for (var i = 1, l = lines.length; i < l; i++) {
      places = [];
      line = lines[i];
      data = line.split($scope.delimiter);

      var name = data[0];
      var lat = data[indexLat];
      var lng = data[indexLng];

      $scope.startups.push({
        name: name,
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
    }
    if ($scope.startups.length) {
      toggleVisibility('#coords', 'show');

      if (!isNaN($scope.startups[0].lat) && !isNaN($scope.startups[0].lng)) {
        $scope.showMap = true;
        $scope.mapMarkers = dataToMarkers($scope.startups);
      };
    }
    
  });

}]);