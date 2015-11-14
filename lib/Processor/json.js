'use strict';

module.exports = function(data, symbol) {
  var output = {
    "type": "FeatureCollection",
    "features": []
  };

  for(var item_id in data) {
    var item = data[item_id];

    var template = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ parseFloat(item[symbol.lon]), parseFloat(item[symbol.lat]) ]
      },
      "properties": item
    };
    output.features.push(template);
  }

  return JSON.stringify(output);
}
