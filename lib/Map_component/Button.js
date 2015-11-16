'use strict';

let L = require('leaflet');

let Button = {};
Button.setPlace = function(map) {
  function setPosition(position) {
    map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
}

Button.resetView = function(map, center) {
  map.setView(new L.LatLng(center.lat, center.lon), center.zoom);
};

module.exports = Button;
