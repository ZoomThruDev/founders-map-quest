app.controller('MainController', ['$scope', '$timeout', 'leafletData', 'leafletBoundsHelpers', function($scope, $timeout, leafletData, leafletBoundsHelpers){

  $scope.bounds = leafletBoundsHelpers.createBoundsFromArray([
    [ 51.508742458803326, -0.087890625 ],
    [ 50.508742458803326, -0.097890625 ]
  ]);

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
    },
    showMap: false,
    csvData: "",
    delimiter: ",",
    startups: [],
    startupsHidden: [],
    dataLat: "Garage Latitude",
    dataLng: "Garage Longitude",
    sortType: '',
    sortReverse: false,
    searchStartup: ''
  });

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
      toggleVisibility('#tableMarkers', 'show');
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
        $scope.bounds = leafletBoundsHelpers.createBoundsFromArray(dataToBounds($scope.startups, 2));

        $scope.toggleMarker = function(index, action) {
          $scope.mapMarkers = updateMarkers($scope.startups, $scope.startupsHidden, index, action);
        }
        console.log(dataToBounds($scope.startups, 2));
      };
    }
    
  });

}]);