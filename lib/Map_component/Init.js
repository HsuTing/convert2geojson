'use strict';

module.exports = (id, center) => {
  if(center.zoom == undefined) {
    center.zoom = 7;
  }
  if(id == undefined) {
    id = "map";
    $("#map").addClass('simple-map');
  }

  mapboxgl.accessToken = "pk.eyJ1IjoiaHN1dGluZyIsImEiOiJRajF4Y0hjIn0.9UDt8uw_fxEX791Styd-lA";
  let map = new mapboxgl.Map({
    container: id,
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [center.lon, center.lat],
    zoom: center.zoom
  });
  map.addControl(new mapboxgl.Navigation());

  return map;
}
