'use strict';

let path = require('path');
let jsonProcessor = require('./Processor/json.js');
let csvProcessor = require('./Processor/csv.js');

module.exports = (data, filename, symbol, handle) => {
  let type = path.extname(filename).replace('.', '');
  let output = "";

  switch(type) {
    case 'json':
      output = jsonProcessor(JSON.parse(data), symbol, handle);
      break;
    case 'csv':
      output = csvProcessor(data, symbol, handle);
      break;
    default:
      let colors = require('colors');
      console.log(("Can not convert this type. If you need to convert to this type, you can open issue in here[").red + ("https://github.com/HsuTing/convert2geojson/issues").underline.blue + ("].").red);
      break;
  }

  return output;
}
