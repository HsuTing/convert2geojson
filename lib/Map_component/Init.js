'use strict';

let L = require('leaflet');

module.exports = function(simple) {
  let map = L.map(simple.id).setView(new L.LatLng(simple.center.lat, simple.center.lon), simple.center.zoom);

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 17, 
    attribution: "Imagery from <a href=\"http://giscience.uni-hd.de/\">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
    id: "hsuting.o5ag6mm2",
    accessToken: "pk.eyJ1IjoiaHN1dGluZyIsImEiOiJRajF4Y0hjIn0.9UDt8uw_fxEX791Styd-lA"
  }).addTo(map);

  return map;
}
