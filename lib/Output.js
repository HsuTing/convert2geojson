'use strict';

let fs = require('fs');
let colors = require('colors');

module.exports = (data, url) => {
  fs.writeFile(url, JSON.stringify(data), (err) => {
    if(err != null) {
      console.log(err);
    }
    else {
      console.log(("'" + url + "' is converted.").blue);
    }
  });
}
