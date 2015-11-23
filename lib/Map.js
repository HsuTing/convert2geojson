'use strict';

let path = require('path');

let Init = require('./Map_component/Init.js');
let Reset = require('./Map_component/Button.js').resetView;
let Set = require('./Map_component/Button.js').setPlace;
let Add = require('./Map_component/Add.js');

module.exports = (Config) => {
  let html = '<div class="simple-map-button">';
  html += '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--2dp simple-map-reset">';
  html += '<i class="material-icons">refresh</i>';
  html += '</button>';
  html += '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--2dp simple-map-set">';
  html += '<i class="material-icons">place</i>';
  html += '</button>';
  html += '</div>';

  $('#' + Config.simple.id)
    .addClass('simple-map')
    .html(html);
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
