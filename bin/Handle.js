'use strict';

let Input = require('./../lib/Input.js');
let Output = require('./../lib/Output.js');

module.exports = function(data, config) {
  let geoData = Input(data, config.name, config.symbol);
  Output(geoData, config.outputUrl);
}
