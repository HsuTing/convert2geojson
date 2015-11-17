'use strict';

function findSymbol(input, output, symbol) {
  for(let key in input) {
    if(typeof(input[key]) == "object") {
      findSymbol(input[key], output, symbol);
    }
    else {
      if(key == symbol.lon)
        output.symbol.lon = input[key];
      else if(key == symbol.lat)
        output.symbol.lat = input[key];
      else {
        if(symbol.include != undefined) {
          for(let includeKey in symbol.include) {
            if(key == includeKey) {
              output.data[ symbol.include[includeKey] ] = input[key];
            }
          }
        }
        else {
          if(output.data[key] == undefined) {
            output.data[key] = input[key];
          }
	  else {
            let tempKey = key + "_";
            let tempInput = {};
            tempInput[tempKey] = input[key];
            findSymbol(tempInput, output, symbol);
          }
        }
      }
    }
  }
}

module.exports = function(data, symbol) {
  let output = {
    "type": "FeatureCollection",
    "features": []
  };

  for(let itemId in data) {
    let item = data[itemId];
    let outputSymbol = {
      symbol: { lon: "", lat: "" },
      data: { }
    };
    findSymbol(item, outputSymbol, symbol);
    outputSymbol.data.lon = outputSymbol.symbol.lon;
    outputSymbol.data.lat = outputSymbol.symbol.lat;

    let template = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ parseFloat(outputSymbol.symbol.lon), parseFloat(outputSymbol.symbol.lat) ]
      },
      "properties": outputSymbol.data
    };
    output.features.push(template);
  }

  return JSON.stringify(output);
}
