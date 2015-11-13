'use strict';

import $ from 'jquery';

import config from './../../../convert2geojson.config.js';
import Input from './input.jsx';

(function() {
  let input = config.input;
  let output = config.output;
  let center = config.center;
  let simple = config.simple;
  let root = '';

  for(let file_id in input) {
    let file = input[file_id];
    let output_file_name = Object.keys(file)[0];
    let url = file[output_file_name].url;
    let symbol = {};
    symbol.lon = file[output_file_name].lon;
    symbol.lat = file[output_file_name].lat;

    let extension_index = url.lastIndexOf('.');
    let type = 'json';  //default
    if(extension_index != -1) {
      type = url.substr(extension_index + 1, url.length);
    }

    $.get(root + url, function(data) {
      let geo_data = Input(data, type, symbol);
console.log(geo_data);
    });
  }
})();
