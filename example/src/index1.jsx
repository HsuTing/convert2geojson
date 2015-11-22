'use strict';

import convert2geojson from 'convert2geojson';

(() => {
/*
  You must set a map, first.
  If You do not set `zoom`, it will set `zoom` as default.
  default:
    zoom.normal -> 8
    zoom.min -> 1
    zoom.max -> 17
*/
  let map = convert2geojson.Init("map", {
    lat: 23.619, 
    lon: 120.795,
    zoom: {
      normal: 8, 
      min: 1,
      max: 17
    }
  });

/*
  If you need to add GPS positioning in your button, you can do this.
  This is default at 12.
*/
  $(".simple-map-set").click(() => { convert2geojson.Set(map); });
/*
  If you need to add resetting in your buttonm you can do this.
*/
  $(".simple-map-reset").click(() => {
    convert2geojson.Reset(map, {
      lat: 23.619, 
      lon: 120.795,
      zoom: 8
    });
  });
/*
  Then you can add Data.
  The second argument is the path for your files, form is (your path)/[name].(your file extension)
  The third argumet is add your data, and it need to be in array. You can see [https://github.com/HsuTing/convert2geojson/wiki/open-a-simple-map].
*/
  convert2geojson.Add(map, "./data/[name].geojson", [
    {'data': {}}
  ]);
})();
