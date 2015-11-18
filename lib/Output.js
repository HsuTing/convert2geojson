'use strict';

let fs = require('fs');

module.exports = (data, url) => {
  fs.writeFile(url, data, (err) => {
    if(err != null) {
      console.log(err);
    }
  });
}
