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
let port = 0;
let flag = {
  "-nc": false,
  "-s": false
};
let portFlag = false;
process.argv.forEach(function (val, index, array) {
  if(index != 0 && index != 1) {
    if(flag[val] != undefined)
      flag[val] = true;
    else if(!portFlag) {
      console.log(("Can not find '" + val + "'.").red);
      process.exit();
    }

    if(val == "-s") {
      portFlag = true;
    }
    else if(portFlag) {
      port = val;
      portFlag = false;
    }
  }
});

if(!flag["-nc"]) {
  let Handle = require('./Handle.js');
  Handle(Config);
}

if(flag["-s"]) {
  let SimpleMap = require('./simpleMap.js');
  SimpleMap(port);
}
