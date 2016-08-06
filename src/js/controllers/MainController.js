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
    headingKeys: ['id', 'company', 'founder', 'city', 'country', 'zip', 'street', 'photo', 'homepage', 'lat', 'lng'],
    heading: {},
    markers: {},
    bounds: {},
    showMap: false,
    csvData: "",
    delimiter: ",",
    startups: [],
    dataLat: "Garage Latitude",
    dataLng: "Garage Longitude",
    sortType: '-id',
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
    lines = $scope.csvData.split('\n');

    if ($scope.csvData.length) {
      toggleVisibility('#delimiter', 'show');
      toggleVisibility('#tableMarkers', 'show');
    };

    // we parse first row like head
    $scope.firstRow = lines[0].split($scope.delimiter);

    for(var i = 0, l = $scope.headingKeys.length; i < l; i++) {
      $scope.heading[$scope.headingKeys[i]] = $scope.firstRow[i];
    }

    if($scope.firstRow.length > 1) {
      indexLat = $scope.firstRow.indexOf($scope.dataLat);
      indexLng = $scope.firstRow.indexOf($scope.dataLng);
    }
    
    // begin from index 1 to avoid header
    for (var i = 1, l = lines.length; i < l; i++) {
      line = lines[i];
      data = line.split($scope.delimiter);

      $scope.startups.push({
        id: data[0],
        company: data[1],
        founder: data[2],
        city: data[3],
        country: data[4],
        zip: data[5],
        street: data[6],
        photo: data[7],
        homepage: data[8],
        lat: parseFloat(data[indexLat]),
        lng: parseFloat(data[indexLng])
      });
    }
    if ($scope.startups.length) {
      toggleVisibility('#coords', 'show');
      toggleVisibility('#formSearch', 'show');

      if (!isNaN($scope.startups[0].lat) && !isNaN($scope.startups[0].lng)) {
        
        $scope.sortBy = function(sortType) {
          $scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
          $scope.sortType = sortType;
        };

        $scope.showMap = true;
        $scope.markers = dataToMarkers($scope.startups);

        $scope.$watch(["markers"], function() {
          updateMap(leafletData);
          
          for(var i = 0, l = $scope.startups.length; i < l; i++) {
            $scope.layers.overlays[$scope.startups[i].id] = {
              type: 'group',
              name: $scope.startups[i].company,
              visible: true
            }
          };
        });

      };
    };
    
  });

}]);