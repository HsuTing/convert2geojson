'use strict';

let csv2json = (data) => {
  let lines = data.split(/\r\n|\n/);
  let keys = [];
  let output = [];
  for(let lineId in lines) {
    let line = lines[lineId].split(/,/);
    if(line == "" || line == undefined) {
      continue;
    }
    else if(lineId == 0) {
      for(let key in line) {
        keys.push(line[key]);
      }
    }
    else {
      let item = {};
      for(let key in line) {
        item[ keys[key] ] = line[key];
      }
      output.push(item);
    }
  }

  return output;
}

module.exports = (data, symbol, handle) => {
  if(handle != undefined) {
    handle(data);
  }
  
  let output = { "type": "FeatureCollection", "features": [] };
  let files = csv2json(data);
  for(let id in files) {
    let file = files[id];
    let lon = parseFloat(file[ symbol.lon ]);
    let lat = parseFloat(file[ symbol.lat ]);

    let properties = {};
    if(symbol.include != undefined) {
      for(let includeKey in symbol.include) {
        properties[ symbol.include[includeKey] ] = file[ includeKey ]
      }
    }
    else {
      for(let item in file) {
        properties[ item ] = file[item];
      }
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
