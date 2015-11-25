'use strict';

let Button = {};
Button.setPlace = (map) => {
  function setPosition(position) {
    map.flyTo({center: [ position.coords.longitude, position.coords.latitude ], zoom: 12});
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
}

Button.resetView = (map, center) => {
  map.flyTo({center: [ center.lon, center.lat ], zoom: center.zoom});
};

module.exports = Button;
