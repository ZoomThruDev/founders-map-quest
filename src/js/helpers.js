var dataToMarkers = function(data) {
  var markers = {};
  for(var i = 0, l = data.length; i < l; i++) {
    place = {
    	layer: data[i].id,
      lat: data[i].lat,
      lng: data[i].lng
    };
    markers[data[i].id] = place;
  };
  return markers;
};

var toggleVisibility = function(tag, action) {
  var e = document.querySelector(tag);
  if (action == 'show') {
    e.removeAttribute('hidden');
  } else {
    e.setAttribute('hidden', 'hidden');
  };
};

var updateMap = function(data) {
  var _leafletMap = null;
  var _leafletMarkers = null;
  data.getMap().then(function(leafletMap){
    _leafletMap = leafletMap;
    data.getMarkers().then(
      function (markers) {
        var bounds = null;
        function getBoundsRecursive(obj) {
          for (key in obj) {
            if (obj[key].getLatLng) {
              if (bounds) {
                bounds.extend(obj[key].getLatLng());
              } else {
                bounds = L.latLngBounds(obj[key].getLatLng(), obj[key].getLatLng());
              }
            } else {
              getBoundsRecursive(obj[key]);
            };
          };
        };
        getBoundsRecursive(markers);
        _leafletMap.fitBounds(bounds, {padding: [ 50, 50 ]});
      }
    );
  }); 
};

var layersToMap = function(data, layers) {
	for(var i = 0, l = data.length; i < l; i++) {
		layers[data[i].id] = {
			type: 'group',
			name: data[i].name,
			visible: true
		};
	};
};
