'use strict';

let colors = require('colors');
let url = require('url');
let path = require('path');
let root = path.resolve(__filename, '..', '..', '..', '..');

let Input = require('./../lib/Input.js');
let Output = require('./../lib/Output.js');

function control(data, config) {
  let geoData = Input(data, config.name, config.symbol);
  Output(geoData, config.outputUrl);
}

module.exports = function(Config) {
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

          control(data, fileConfig);
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
  
          control(data, fileConfig);
          console.log(("'" + outputFileName + "' is converted.").blue);
        }
      });
    }
  }
}
