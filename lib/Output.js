'use strict';

let fs = require('fs');

module.exports = function(data, url) {
  fs.writeFile(url, data, function(err) {
    if(err != null) {
      console.log(err);
    }
  });
}
