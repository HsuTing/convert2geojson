'use strict';

let convert2geojson = {};

convert2geojson.Input = require('./lib/Input.js');
convert2geojson.Map = require('.//lib/Map.js');
convert2geojson.Init = require('./lib/Map_component/Init.js');
convert2geojson.Add = require('./lib/Map_component/Data.js');
convert2geojson.Reset = require('./lib/Map_component/Button.js').resetView;
convert2geojson.Set = require('./lib/Map_component/Button.js').setPlace;

module.exports = convert2geojson;
