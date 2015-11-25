"use strict";

let add = (map, data, file, filename) => {
  map.on("style.load", () => {
    map.addSource(filename, {
      "type": "geojson",
      "data": data
    });

   let style = {
     polygon: {
       visible: true,
       style: {
         "fill-color": "blue",
         "fill-opacity": 0.5
       },
       info: true,
       filter: [ "all" ]
     },
     line: {
       visible: true,
       style: {
         "line-color": "blue",
         "line-width": 8
       },
       info: true,
       filter: [ "all" ]
     },
     circle: {
       visible: false,
       style: {
         "circle-radius": 10,
         "circle-color": "blue",
         "circle-blur": 1
       },
       info: true,
       filter: [ "all" ]
     },
     icon: {
       visible: true,
       style: {
         "icon-image": "marker-15"
       },
       info: true,
       filter: [ "all" ]
     }
   };

   for(let key in file.style) {
     for(let item in file.style[key]) {
       style[key][item] = file.style[key][item];
     }
   }

   if(style.polygon.visible) {
      map.addLayer({
        "id": filename + "-polygon",
        "type": "fill",
        "source": filename,
        "paint": style.polygon.style,
        "interactive": style.polygon.info,
        "filter": style.polygon.filter
      });
    }

    if(style.line.visible) {
      map.addLayer({
        "id": filename + "-line",
        "type": "line",
        "source": filename,
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": style.line.style,
        "interactive": style.line.info,
        "filter": style.line.filter
      });
    }

    if(style.circle.visible) {
      map.addLayer({
        "id": filename + "-circle",
        "type": "circle",
        "source": filename,
        "paint": style.circle.style,
        "interactive": style.circle.info,
        "filter": style.circle.filter
      });
    }

    if(style.icon.visible) {
      map.addLayer({
        "id": filename + "-symbol",
        "type": "symbol",
        "source": filename,
        "layout": style.icon.style,
        "interactive": style.icon.info,
        "filter": style.icon.filter
      });
    }

    map.on('click', function (e) {
      map.featuresAt(e.point, {radius: 5}, function (err, features) {
        if(features.length == 0) {
          return;
        }

        let html = "";
        let info = features[0].properties; 

        if(file.title == undefined && file.content == undefined) {
          for(let key in info) {
            html += "<font class='content'>" + key + "： " + info[key] + "</font><br/>";
          }   
        }
        else {
          for(let key in file.title) {
            html += "<font class='header'>" + file.title[key] + (file.title[key] == "" ? "" : "： ") + info[key] + "</font><br/>"
          }
          for(let key in file.content) {
            html += "<font class='content'>" + file.content[key] + (file.content[key] == "" ? "" : "： ") + info[key] + "</font><br/>"
          }
        }

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map);
        });
    });
  });
}

module.exports = (map, path, files) => {
  for(let i in files) {
    let fileName = Object.keys(files[i])[0];
    let file = files[i][fileName];
    if(path == undefined) {
      add(map, file.data, file, fileName);
    }
    else {
      let fileName = Object.keys(files[i])[0];
      let url = path.replace("[name]", fileName);
      let file = files[i][fileName];

      $.getJSON(url, (data) => {
        add(map, data, file, fileName);
      });
    }
  }
}
