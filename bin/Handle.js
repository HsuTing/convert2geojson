'use strict';

let colors = require('colors');
let url = require('url');
let path = require('path');
let root = path.resolve(__filename, '..', '..', '..', '..');

let Input = require('./../lib/Input.js');
let Output = require('./../lib/Output.js');

let control = (data, config) => {
  let geoData = Input(data, config.name, config.symbol, config.handle);
  Output(geoData, config.outputUrl);
}

module.exports = (Config) => {
  for(let fileId in Config.input) {
    let outputFileName = Object.keys(Config.input[fileId])[0];
    let file = Config.input[fileId][outputFileName];

    if(url.parse(file.url).protocol != null) {
      let request = require('request');
      let fileUrl = file.url.split('!')[0];
      let fileName = "temp." + file.url.split('!')[1];
      request.get(fileUrl, (error, response, data) => {
        if(error != null) {
          console.log(("Error: ENOENT: no such file or directory, open '" + fileUrl + "'.").red);
        }   
        else {
          let fileConfig = { 
            name: fileName,
            outputUrl: path.join(root, Config.output.path, Config.output.filename).replace('[name]', outputFileName),
            symbol: file.symbol,
            handle: file.handle
          };

          control(data, fileConfig);
        }
      });
    }
    else {
      let fileUrl = path.join(root, file.url);
      let fs = require('fs');
      fs.readFile(fileUrl, 'utf8', (error, data) => {
        if(error != null) {
          console.log(("Error: ENOENT: no such file or directory, open '" + fileUrl + "'.").red);
        }
        else {
          let fileConfig = {
            name: path.basename(fileUrl),
            outputUrl: path.join(root, Config.output.path, Config.output.filename).replace('[name]', outputFileName),
            symbol: file.symbol,
            handle: file.handle
          };
  
          control(data, fileConfig);
        }
      });
    }
  }
}
