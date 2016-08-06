var dataToMarkers = function(data) {
  var markers = {};
  for(var i = 0, l = data.length; i < l; i++) {
    place = {
      lat: data[i].lat,
      lng: data[i].lng
    };
    markers[data[i].id] = place;
  }

  return markers;
};

var updateMarkers = function (data, data2, index, action) {
  if (action == 'hide') {
    data2.push(index);
    data.splice(data.indexOf(index), 1);
  } else {
    data.push(index);
    data2.splice(data2.indexOf(index), 1);
  }
  return data;
}

var toggleVisibility = function(tag, action) {
  var e = document.querySelector(tag);
  if (action == 'show') {
    e.removeAttribute('hidden');
  } else {
    e.setAttribute('hidden', 'hidden');
  }
}

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
            }
          }
        };
        getBoundsRecursive(markers);
        _leafletMap.fitBounds(bounds, {padding: [ 50, 50 ]});
      }
    )
  }); 
}