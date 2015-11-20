'use strict';

module.exports = (map, path, files) => {
  for(let i in files) {
    let fileName = Object.keys(files[i])[0];
    let url = path.replace('[name]', fileName);
    let file = files[i][fileName];

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
