var dataToMarkers = function(data) {
  var markers = [];
  for(var i = 0, l = data.length; i < l; i++) {
    place = {
      lat: data[i].lat,
      lng: data[i].lng
    };
    markers.push(place);
  }

  return markers;
};

var toggleVisibility = function(tag, action) {
  var e = document.querySelector(tag);
  if (action == 'show') {
    e.removeAttribute('hidden');
  } else {
    e.setAttribute('hidden', 'hidden');
  }
}