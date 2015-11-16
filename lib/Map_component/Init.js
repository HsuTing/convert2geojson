'use strict';

let L = require('leaflet');

module.exports = function(simple) {
  if(simple.center.zoom == undefined) {
    simple.center.zoom = {};
  }
  else if(typeof(simple.center.zoom) != "object") {
    simple.center.zoom = {};
  }
  if(simple.center.zoom.normal == undefined) {
    simple.center.zoom.normal = 8;
  }
  if(simple.center.zoom.min == undefined) {
    simple.center.zoom.min = 1;
  }
  if(simple.center.zoom.max == undefined) {
    simple.center.zoom.max = 17;
  }
  if(parseInt(simple.center.zoom.min) < 1 || parseInt(simple.center.zoom.min) > 17) {
    simple.center.zoom.min = 1;
  }
  if(parseInt(simple.center.zoom.max) < 1 || parseInt(simple.center.zoom.max) > 17) {
    simple.center.zoom.max = 17;
  }
  if(parseInt(simple.center.zoom.normal) < 1 || parseInt(simple.center.zoom.normal) > 17) {
    simple.center.zoom.normal = 8;
  }
  if(simple.center.zoom.min < simple.center.zoom.normal && simple.center.zoom.max > simple.center.zoom.normal) {
  }
  else {
    simple.center.zoom.normal = simple.center.zoom.max;
  }

  let map = L.map(simple.id).setView(new L.LatLng(simple.center.lat, simple.center.lon), simple.center.zoom.normal);

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: simple.center.zoom.max,
    minZoom: simple.center.zoom.min,
    attribution: "Imagery from <a href=\"http://giscience.uni-hd.de/\">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
    id: "hsuting.o5ag6mm2",
    accessToken: "pk.eyJ1IjoiaHN1dGluZyIsImEiOiJRajF4Y0hjIn0.9UDt8uw_fxEX791Styd-lA"
  }).addTo(map);

  return map;
}
