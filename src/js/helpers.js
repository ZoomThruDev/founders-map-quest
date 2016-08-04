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

var dataToBounds = function(data, max) {
   var bound, bounds = [];
   for(var i = 0; i < max; i++) {
    bound = [];
    bound.push(data[i].lat);
    bound.push(data[i].lng);
    bounds.push(bound);
   }
   return bounds;
};

var toggleVisibility = function(tag, action) {
  var e = document.querySelector(tag);
  if (action == 'show') {
    e.removeAttribute('hidden');
  } else {
    e.setAttribute('hidden', 'hidden');
  }
}