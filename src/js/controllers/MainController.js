app.controller('MainController', ['$scope', '$timeout', 'leafletData', function($scope, $timeout, leafletData){

  angular.extend($scope, {
    mapCenter: {
      lat: 37.3403188,
      lng: -122.0581469,
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
    layers: {
      baselayers: {
        openStreetMap: {
          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
      },
      overlays: {}
    },
    markers: {},
    bounds: {},
    showMap: false,
    csvData: "",
    delimiter: ",",
    startups: [],
    startupsHidden: [],
    dataLat: "Garage Latitude",
    dataLng: "Garage Longitude",
    sortType: 'Name',
    sortReverse: true,
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
  
    var lines, data, length, indexLat, indexLng;
    $scope.startups = [];
    $scope.places = [];
    lines = $scope.csvData.split('\n');

    if ($scope.csvData.length) {
      toggleVisibility('#delimiter', 'show');
      toggleVisibility('#tableMarkers', 'show');
    };

    $scope.sortBy = function(sortType) {
      $scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
      $scope.sortType = sortType;
    };

    // we parse first row like head
    $scope.heading = lines[0].split($scope.delimiter);

    if($scope.heading.length > 1) {
      indexLat = $scope.heading.indexOf($scope.dataLat);
      indexLng = $scope.heading.indexOf($scope.dataLng);
    }
    
    // begin from index 1 to avoid header
    for (var i = 1, l = lines.length; i < l; i++) {
      line = lines[i];
      data = line.split($scope.delimiter);

      var id = data[0];
      var name = data[1];
      var lat = data[indexLat];
      var lng = data[indexLng];

      $scope.startups.push({
        id: id,
        name: name,
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
    }
    if ($scope.startups.length) {
      toggleVisibility('#coords', 'show');
      toggleVisibility('#formSearch', 'show');

      if (!isNaN($scope.startups[0].lat) && !isNaN($scope.startups[0].lng)) {
        $scope.showMap = true;
        $scope.markers = dataToMarkers($scope.startups);

        $scope.$watch(["markers"], function() {
          updateMap(leafletData);
          for(var i = 0, l = $scope.startups.length; i < l; i++) {
            $scope.layers.overlays[$scope.startups[i].id] = {
              type: 'group',
              name: $scope.startups[i].name,
              visible: true
            }
          };
        });

      };
    };
    
  });

}]);