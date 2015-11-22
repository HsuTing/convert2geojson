'use strict';

let convert2geojson = {};

convert2geojson.Input = require('./Input.js');
convert2geojson.Map = require('./Map.js');
convert2geojson.Init = require('./Map_component/Init.js');
convert2geojson.Add = require('./Map_component/Data.js');
convert2geojson.Reset = require('./Map_component/Button.js').resetView;
convert2geojson.Set = require('./Map_component/Button.js').setPlace;

module.exports = convert2geojson;
