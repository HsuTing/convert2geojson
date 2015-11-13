'use strict';

export default function(data, symbol) {
  let output = {
    "type": "FeatureCollection",
    "features": []
  };

  for(let item_id in data) {
    let item = data[item_id];

    let template = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ parseFloat(item[symbol.lon]), parseFloat(item[symbol.lat]) ]
      },
      "properties": item
    };

    output.features.push(template);
  }

  return output;
}
