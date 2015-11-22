'use strict';

var Map = require('./../convert2geojson.js').Map;
var Config = require('./../../../convert2geojson.config.js');

(function() {
  $('body').html('<div id ="' + Config.simple.id + '"></div>');
  Map(Config); 
})();
