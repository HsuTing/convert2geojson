'use strict';

let compare = (input, symbol) => {
  for(let key in symbol) {
    if(input[key] == undefined || typeof(input[key]) != typeof(symbol[key]))
      return false;
  }
  return true;
}

let reSort = (input, symbolData, arraySymbol, symbol) => {
  if(!compare(input, symbol)) {
    if(typeof(input) == "object") {
      for(let key in input) {
        reSort(input[key], symbolData, arraySymbol, symbol);
        if(typeof(input[key]) != "object") {
          if(symbolData[key] == undefined) {
            symbolData[key] = input[key];
          }
          else {
            if(typeof(symbolData[key]) == "object") {
              let temp = {};
              temp[key] = input[key];
              symbolData[key].push(temp);
            }   
            else {
              let temp1 = {};
              let temp2 = {};
              temp1[key] = symbolData[key];
              temp2[key] = input[key];
              symbolData[key] = [];
              symbolData[key].push(temp1);
              symbolData[key].push(temp2);
            }
          }
        }
      }
    }
  }
  else {
    arraySymbol.push(input);
  }
}

let combine = (tempSymbol, symbolData) => {
  for(let key in tempSymbol) {
    if(typeof(tempSymbol[key]) == "object") {
      combine(tempSymbol[key], symbolData);
    }
    else {
      if(symbolData[key] == undefined) {
        symbolData[key] = tempSymbol[key];
      }
      else {
        if(typeof(symbolData[key]) == "object") {
          let temp = {};
          temp[key] = tempSymbol[key];
          symbolData[key].push(temp);
        }
        else {
          let temp1 = {};
          let temp2 = {};
          temp1[key] = symbolData[key];
          temp2[key] = tempSymbol[key];
          symbolData[key] = [];
          symbolData[key].push(temp1);
          symbolData[key].push(temp2);
        }
      }
    }
  }
}

let findSymbol = (input, output, symbol) => {
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
            if(typeof(output.data[key]) == "object") {
              output.data[key].push(input[key]);
            } 
            else {
              let tempValue = output.data[key];
              output.data[key] = [];
              output.data[key].push(tempValue);
              output.data[key].push(input[key]);
            }
          }
        }
      }
    }
  }
}

module.exports = (data, symbol) => {
  let output = {
    "type": "FeatureCollection",
    "features": []
  };

  if(data[0] == undefined) {
    data = [ data ];
  }

  for(let itemId in data) {
    let item = data[itemId];
    let symbolData = {};
    let arraySymbol = [];
    reSort(item, symbolData, arraySymbol, symbol.unit); 

    for(let symbolId in arraySymbol) {
      let outputSymbol = { symbol: { lon: "", lat: "" }, data: {} };
      let tempSymbol = arraySymbol[symbolId];
      let tempSymbolData = JSON.parse(JSON.stringify(symbolData));

      combine(tempSymbol, tempSymbolData);
      findSymbol(tempSymbolData, outputSymbol, symbol);

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
  }

  return JSON.stringify(output);
}
