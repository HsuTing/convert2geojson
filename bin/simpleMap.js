'use strict';

let path = require('path');
let colors = require('colors');
let root = path.resolve(__filename, '..', '..');
let express = require('express');
let app = express();
let port = 8000;

module.exports = function(portIn) {
  if(portIn != 0) {
    port = portIn;
  }

  app.use(express.static(path.join(root, 'simple-map')));
  app.get('/', function (req, res) {
    res.sendfile(path.join(root, 'simple-map/index.html'));
  });

  app.listen(port, function (req, res) {
    console.log(('Server running at http://127.0.0.1:' + port + '/').blue);
  });
}
