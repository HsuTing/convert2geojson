'use strict';

let Button = {};
Button.setPlace = (map) => {
  function setPosition(position) {
    map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
}

Button.resetView = (map, center) => {
  map.setView(new L.LatLng(center.lat, center.lon), center.zoom.normal);
};

module.exports = Button;
