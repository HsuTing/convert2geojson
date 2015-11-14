#!/usr/bin/env node 

var path = require('path');
try {
  var local = require.resolve(path.join(process.cwd(), "node_modules", "convert2geojson", "bin", "convert2geojson.js"));
  if(__filename !== localWebpack) {
    return require(localWebpack);
  }   
} catch(e) {}

var fs = require('fs');
var root = path.resolve(__filename, '..', '..', '..', '..');
var Config = require(path.join(root, 'convert2geojson.config.js'));

var Input = require('./../lib/Input.jsx');
var Output = require('./../lib/Output.jsx');

for(var file_id in Config.input) {
  var file = Config.input[file_id];
  var output_file_name = Object.keys(file)[0];
  var url = path.join(root, file[output_file_name].url);
  var symbol = {};
  symbol.lon = file[output_file_name].lon;
  symbol.lat = file[output_file_name].lat;

  fs.readFile(url, 'utf8', function(err, data) {
    if(err != null) {
      var colors = require('colors');
      console.log(("Error: ENOENT: no such file or directory, open '" + url + "'.").red);
    }
    else {
      var geo_data = Input(data, path.basename(url), symbol);
      var output_url = path.join(root, Config.output.path, Config.output.filename).replace('[name]', output_file_name);
      Output(geo_data, output_url);
    }
  });
}
