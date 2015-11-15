#!/usr/bin/env node 
'use strict';

let path = require('path');
try {
  let local = require.resolve(path.join(process.cwd(), "node_modules", "convert2geojson", "bin", "convert2geojson.js"));
  if(__filename !== local) {
    return require(local);
  }   
} catch(e) {};

let colors = require('colors');
let url = require('url');
let root = path.resolve(__filename, '..', '..', '..', '..');

try {
  require.resolve(path.join(root, 'convert2geojson.config.js'));
} catch(e) {
  console.log(("Can not find 'convert2geojson.config.js'.").red);
  process.exit();
}

let Config = require(path.join(root, 'convert2geojson.config.js'));
let Handle = require('./Handle.js');

for(let fileId in Config.input) {
  let outputFileName = Object.keys(Config.input[fileId])[0];
  let file = Config.input[fileId][outputFileName];

  if(url.parse(file.url).protocol != null) {
    let request = require('request');
    request.get(file.url, function(error, response, data) {
      if(error != null) {
        console.log(("Error: ENOENT: no such file or directory, open '" + file.url + "'.").red);
      }
      else {
        let fileConfig = {
          name: path.basename(file.url),
          outputUrl: path.join(root, Config.output.path, Config.output.filename).replace('[name]', outputFileName),
          symbol: file.symbol
        };

        Handle(data, fileConfig);
        console.log(("'" + outputFileName + "' is converted.").blue);
      }
    });
  }
  else {
    let fileUrl = path.join(root, file.url);
    let fs = require('fs');
    fs.readFile(fileUrl, 'utf8', function(error, data) {
      if(error != null) {
        console.log(("Error: ENOENT: no such file or directory, open '" + fileUrl + "'.").red);
      }
      else {
        let fileConfig = {
          name: path.basename(fileUrl),
          outputUrl: path.join(root, Config.output.path, Config.output.filename).replace('[name]', outputFileName),
          symbol: file.symbol
        };

        Handle(data, fileConfig);
        console.log(("'" + outputFileName + "' is converted.").blue);
      }
    });
  }
}
