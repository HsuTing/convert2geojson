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
        if(symbol.path != undefined && symbol.path == key) {
          symbolData[key] = input[key];
        }
        else if(symbol.lat == key) {
          symbolData[key] = input[key];
        }
        else if(symbol.lon == key) {
          symbolData[key] = input[key];
        }
        else {
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
  }
  else {
    arraySymbol.push(input);
  }
}

let combine = (tempSymbol, symbolData, symbol) => {
  for(let key in tempSymbol) {
    if(typeof(tempSymbol[key]) == "object") {
      if(symbol.path != undefined && symbol.path == key) {
        symbolData[key] = tempSymbol[key];
      }
      else if(symbol.lon == key) {
        symbolData[key] = tempSymbol[key];
      }
      else if(symbol.lat == key) {
        symbolData[key] = tempSymbol[key];
      }
      else {
        combine(tempSymbol[key], symbolData, symbol);
      }
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
      if(symbol.path != undefined && symbol.path == key) {
        for(let pId in input[key]) {
          output.symbol.path.push(input[key][pId]);
        }
      }
      else if(symbol.lon == key) {
        output.symbol.lon = [];
        for(let lonId in input[key]) {
          output.symbol.lon.push(input[key][lonId]);
        }
      }
      else if(symbol.lat == key) {
        output.symbol.lat = [];
        for(let latId in input[key]) {
          output.symbol.lat.push(input[key][latId]);
        }
      }
      else {
        findSymbol(input[key], output, symbol);
      }
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

let makeTemplate = (data, type, coordinates) => {
  let template = { type: "Feature", geometry: {} };
  data.data.lon = data.symbol.lon;
  data.data.lat = data.symbol.lat;

  template.geometry.type = type;
  template.geometry.coordinates = coordinates;
  template.properties = data.data;

  return template;
}

module.exports = (data, symbol, handle) => {
  if(handle != undefined) {
    handle(data);
  }

  let output = {
    "type": "FeatureCollection",
    "features": []
  };

  if(data[0] == undefined) {
    data = [ data ];
  }

  if((symbol.path == undefined && symbol.lon == undefined && symbol.lat == undefined )|| symbol.unit == undefined) {
    console.log("Error, ['lon', 'lat'] or ['path'] is needed and 'unit' is needed, too.");
    process.exit();
  } 

  for(let itemId in data) {
    let item = data[itemId];
    let symbolData = {};
    let arraySymbol = [];
    reSort(item, symbolData, arraySymbol, symbol.unit); 

    for(let symbolId in arraySymbol) {
      let outputSymbol = { symbol: { lon: "", lat: "", path: [] }, data: {} };
      let tempSymbol = arraySymbol[symbolId];
      let tempSymbolData = JSON.parse(JSON.stringify(symbolData));

      combine(tempSymbol, tempSymbolData, symbol);
      findSymbol(tempSymbolData, outputSymbol, symbol);

      if(outputSymbol.symbol.path.length == 0) {
        outputSymbol.data.lon = outputSymbol.symbol.lon;
        outputSymbol.data.lat = outputSymbol.symbol.lat;
        if(typeof(outputSymbol.symbol.lon) == "object" && typeof(outputSymbol.symbol.lat) == "object") {
          for(let id in outputSymbol.symbol.lon) {
            output.features.push( makeTemplate(outputSymbol, "Point", [parseFloat(outputSymbol.symbol.lon[id]), parseFloat(outputSymbol.symbol.lat[id])]) );
          }
        }
        else {
          output.features.push( makeTemplate(outputSymbol, "Point", [parseFloat(outputSymbol.symbol.lon), parseFloat(outputSymbol.symbol.lat)]) );
        }
      }
      else {
        if(outputSymbol.symbol.lon != "" && outputSymbol.symbol.lat != "") {
          outputSymbol.data.lon = outputSymbol.symbol.lon;
          outputSymbol.data.lat = outputSymbol.symbol.lat;
          if(typeof(outputSymbol.symbol.lon) == "object" && typeof(outputSymbol.symbol.lat) == "object") {
            for(let id in outputSymbol.symbol.lon) {
              output.features.push( makeTemplate(outputSymbol, "Point", [parseFloat(outputSymbol.symbol.lon[id]), parseFloat(outputSymbol.symbol.lat[id])]) );
            }
          }
          else {
            output.features.push( makeTemplate(outputSymbol, "Point", [parseFloat(outputSymbol.symbol.lon), parseFloat(outputSymbol.symbol.lat)]) );
          }
        }

        outputSymbol.data.path = outputSymbol.symbol.path;
        let type = (typeof(outputSymbol.symbol.path[0][0]) == "object") ? "Polygon" : "LineString";
        output.features.push( makeTemplate(outputSymbol, type, outputSymbol.symbol.path) );
      }
    }
  }

  return output;
}
