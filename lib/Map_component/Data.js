'use strict';

let path = require('path');

module.exports = (map, Config) => {
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
          let marker = L.marker(point);
          return marker;
        }
      }).addTo(map);
    });
  }
}
