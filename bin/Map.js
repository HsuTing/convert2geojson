'use strict';

let $ = require('jquery');
let Map = require('./../lib/Map.js');
let Config = require('./../../../convert2geojson.config.js');

(() => {
  $('body').html('<div id ="' + Config.simple.id + '"></div>');
  Map(Config); 
})();
