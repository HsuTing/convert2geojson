'use strict';

let L = require('leaflet');
let $ = require('jquery');
let path = require('path');
let markerIcon = require('./../../simple-map/img/marker-icon.png');
let markerShadow = require('./../../simple-map/img/marker-shadow.png');

module.exports = function(map, Config) {
  let icon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [22, 94],
    popupAnchor: [-10, -86],
    shadowAnchor: [22, 94] 
  });

  for(let i in Config.simple.include) {
    let fileName = Object.keys(Config.simple.include[i])[0];
    let url = path.join(Config.output.path, Config.output.filename).replace('[name]', fileName);
    $.getJSON(url, function(data) {
      L.geoJson(data, {
        onEachFeature(feature, layer) {
          let html = ""; 
          for(let key in feature.properties) {
            html += key + "： " + feature.properties[key] + "<br/>";
          }   
          layer.bindPopup(html);
        },  
        pointToLayer(feature, point) {
          let marker = L.marker(point, {icon: icon});
          return marker;
        }
      }).addTo(map);
    });
  }
}
