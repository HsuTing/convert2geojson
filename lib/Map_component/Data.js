'use strict';

let $ = require('jquery');
let L = require('leaflet');
let path = require('path');
let markerIcon = require('./../../simple-map/img/marker-icon.png');
let markerShadow = require('./../../simple-map/img/marker-shadow.png');

module.exports = (map, Config) => {
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
    let file = Config.simple.include[i][fileName];

    $.getJSON(url, (data) => {
      L.geoJson(data, {
        onEachFeature(feature, layer) {
          let html = ""; 

          if(file.title == undefined && file.content == undefined) {
            for(let key in feature.properties) {
              html += "<font class='content'>" + key + "： " + feature.properties[key] + "</font><br/>";
            }   
            layer.bindPopup(html);
          }
          else {
            for(let key in file.title) {
              html += "<font class='header'>" + file.title[key] + (file.title[key] == "" ? "" : "： ") + feature.properties[key] + "</font><br/>"
            }
            for(let key in file.content) {
              html += "<font class='content'>" + file.content[key] + (file.content[key] == "" ? "" : "： ") + feature.properties[key] + "</font><br/>"
            }
            layer.bindPopup(html);
          }
        },  
        pointToLayer(feature, point) {
          let marker = L.marker(point, {icon: icon});
          return marker;
        }
      }).addTo(map);
    });
  }
}
