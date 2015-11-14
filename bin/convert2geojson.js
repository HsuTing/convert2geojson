#!/usr/bin/env node 

var path = require('path');
try {
  var local = require.resolve(path.join(process.cwd(), "node_modules", "convert2geojson", "bin", "convert2geojson.js"));
  if(__filename !== local) {
    return require(local);
  }   
} catch(e) {};

var colors = require('colors');
var url = require('url');
var root = path.resolve(__filename, '..', '..', '..', '..');
var Config = require(path.join(root, 'convert2geojson.config.js'));
var convert2geojson = require('./../convert2geojson.js')
var Input = convert2geojson.Input;
var Output = convert2geojson.Output;

for(var fileId in Config.input) {
  var outputFileName = Object.keys(Config.input[fileId])[0];
  var file = Config.input[fileId][outputFileName];
  var symbol = {};
  symbol.lon = file.lon;
  symbol.lat = file.lat;

  if(url.parse(file.url).protocol != null) {
    var request = require('request');
    request.get(file.url, function(error, response, data) {
      if(error != null) {
        console.log(("Error: ENOENT: no such file or directory, open '" + file.url + "'.").red);
      }
      else {
        var geoData = Input(data, path.basename(file.url), symbol);
        var outputUrl = path.join(root, Config.output.path, Config.output.filename).replace('[name]', outputFileName);
        Output(geoData, outputUrl);
      }
    });
  }
  else {
    var fileUrl = path.join(root, file.url);
    var fs = require('fs');
    fs.readFile(fileUrl, 'utf8', function(error, data) {
      if(error != null) {
        console.log(("Error: ENOENT: no such file or directory, open '" + fileUrl + "'.").red);
      }
      else {
        var geoData = Input(data, path.basename(fileUrl), symbol);
        var outputUrl = path.join(root, Config.output.path, Config.output.filename).replace('[name]', outputFileName);
        Output(geoData, outputUrl);
      }
    });
  }
}
