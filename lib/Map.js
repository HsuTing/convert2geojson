'use strict';

require('./../simple-map/style.css');
let button = require('html!./../simple-map/button.html');

let $ = require('jquery');
let Init = require('./Map_component/Init.js');
let Reset = require('./Map_component/Button.js').resetView;
let Set = require('./Map_component/Button.js').setPlace;
let Add = require('./Map_component/Data.js');

module.exports = function(Config) {
  $('#' + Config.simple.id)
    .addClass('simple-map')
    .html(button);
  let map = Init(Config.simple);
  Add(map, Config);

  $(".simple-map-reset").click(function() { Reset(map, Config.simple.center); });
  $(".simple-map-set").click(function() { Set(map); });
}
