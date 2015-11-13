'use strict';

//import style
import style from './../../css/index';

//import jsx
import L from 'leaflet';
import {
  init as Init,
  setPlace as Set,
  resetView as Reset,
  addData as Add
} from './map';
import $ from 'jquery';

(function() {
  let config = require('json!./../../file.config');
  let center = config.center;
  let map = L.map('map').setView(new L.LatLng(center.lat, center.lon), 8);

  Init(map);
  Add(map, config);

  $("#reset").click(function() { Reset(map, center); });
  $("#set").click(function() { Set(map); });
})();
