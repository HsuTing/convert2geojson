'use strict';

module.exports = (id, center) => {
  if(center.zoom == undefined) {
    center.zoom = {};
  }
  else if(typeof(center.zoom) != "object") {
    center.zoom = {};
  }
  if(center.zoom.normal == undefined) {
    center.zoom.normal = 8;
  }
  if(center.zoom.min == undefined) {
    center.zoom.min = 1;
  }
  if(center.zoom.max == undefined) {
    center.zoom.max = 17;
  }
  if(parseInt(center.zoom.min) < 1 || parseInt(center.zoom.min) > 17) {
    center.zoom.min = 1;
  }
  if(parseInt(center.zoom.max) < 1 || parseInt(center.zoom.max) > 17) {
    center.zoom.max = 17;
  }
  if(parseInt(center.zoom.normal) < 1 || parseInt(center.zoom.normal) > 17) {
    center.zoom.normal = 8;
  }
  if(center.zoom.min < center.zoom.normal && center.zoom.max > center.zoom.normal) {
  }
  else {
    center.zoom.normal = center.zoom.max;
  }
  if(id == undefined) {
    id = "map";
    $("#map").addClass('simple-map');
  }

  let map = L.map(id).setView(new L.LatLng(center.lat, center.lon), center.zoom.normal);

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: center.zoom.max,
    minZoom: center.zoom.min,
    attribution: "Imagery from <a href=\"http://giscience.uni-hd.de/\">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
    id: "hsuting.o5ag6mm2",
    accessToken: "pk.eyJ1IjoiaHN1dGluZyIsImEiOiJRajF4Y0hjIn0.9UDt8uw_fxEX791Styd-lA"
  }).addTo(map);

  return map;
}
