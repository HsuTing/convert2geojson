'use strict';

let button = require('html!./../simple-map/button.html');

let path = require('path');

let Init = require('./Map_component/Init.js');
let Reset = require('./Map_component/Button.js').resetView;
let Set = require('./Map_component/Button.js').setPlace;
let Add = require('./Map_component/Data.js');

module.exports = (Config) => {
  $('#' + Config.simple.id)
    .addClass('simple-map')
    .html(button);
  let map = Init(Config.simple.id, Config.simple.center);
  let outputPath = path.join(Config.output.path, Config.output.filename);
  Add(map, outputPath, Config.simple.include);

  let reset = {
    lat: Config.simple.center.lat,
    lon: Config.simple.center.lon,
    zoom: Config.simple.center.zoom.normal
  };

  $(".simple-map-reset").click(() => { Reset(map, reset); });
  $(".simple-map-set").click(() => { Set(map); });
}
