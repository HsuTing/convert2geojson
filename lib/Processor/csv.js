'use strict';

let csv2array = require('csv2array');

let makeKey = (keyArray) => {
  let keys = {};
  for(let item in keyArray) {
    keys[ keyArray[item] ] = item;
  }
  return keys;
}

module.exports = (data, symbol, handle) => {
  if(handle != undefined) {
    handle(data);
  }
  
  let output = { "type": "FeatureCollection", "features": [] };
  let files = csv2array(data);
  let keyNumber = files[0];
  let keys = makeKey(files[0]);
  for(let id in files) {
    if(id == 0) {
      continue;
    }

    let file = files[id];
    let lon = parseFloat(file[ keys[symbol.lon] ]);
    let lat = parseFloat(file[ keys[symbol.lat] ]);

    let properties = {};
    for(let item in file) {
      properties[ keyNumber[item] ] = file[item];
    }

    let template = {
      type: "Feature",
      geometry: {
        "type": "Point",
        "coordinates": [lon, lat]
      },
      "properties": properties
    };
    
    output.features.push(template);
  }
  return output;
}
