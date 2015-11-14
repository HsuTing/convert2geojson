'use strict';

var jsonProcessor = require('./Processor/json.jsx');

module.exports = function(data, type, symbol) {
  var output = "";

  switch(type) {
    case 'json':
      output = jsonProcessor(JSON.parse(data), symbol);
      break;
    default:
      var colors = require('colors');
      console.log(("Can not convert this type. If you need to convert to this type, you can open issue in here[").red + ("https://github.com/HsuTing/convert2geojson/issues").underline.blue + ("].").red);
      break;
  }

  return output;
}
