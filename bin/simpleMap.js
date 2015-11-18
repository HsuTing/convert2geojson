'use strict';

let path = require('path');
let colors = require('colors');
let root = path.resolve(__filename, '..', '..');
let express = require('express');
let app = express();
let port = 8080;

module.exports = () => {
  let webpack = require('webpack');
  let WebpackDevServer = require('webpack-dev-server');
  let webpackConfig = require('./../webpack.config.js');

  let express = require('express');
  let proxy = require('proxy-middleware');
  let url = require('url');

  let app = express();
  let Config = require(path.resolve(root, '..', '..', 'convert2geojson.config.js'));
  if(Config.simple == undefined) {
    console.log(('You need to add "simple" in "config". You can see https://github.com/HsuTing/convert2geojson/wiki .').red);
    process.exit();
  }
  for(let i in Config.simple.include) {
    let fileName = Object.keys(Config.simple.include[i])[0];
    let url = path.join(Config.output.path, Config.output.filename).replace('[name]', fileName);
    let fs = require('fs');
    fs.readFile(url, 'utf8', (error, data) => {
      if(error != null) {
        console.log(("Can not find '" + fileName + "'.").red);
        process.exit();
      }
      else {
        app.get('/' + url, (req, res) => {
          res.sendFile(path.resolve(root, '..', '..', url));
        });
      }
    });
  }

  app.use('/simple-map', proxy(url.parse('http://localhost:9090/simple-map')));
  app.get('/', (req, res) => {
      res.sendFile(path.join(root, 'simple-map/index.html'));
  });

  let server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: path.join(root, 'simple-map'),
    hot: true,
    quiet: false,
    noInfo: true,
    publicPath: "/simple-map/",
    stats: { colors: true },
    proxy: {
      "*": "http://localhost:9090"
    },
    headers: { "X-Custom-Header": "yes" }
  });

  server.listen(port, "localhost", () => {});
  app.listen(9090);
  console.log(("Open simple map in 'http://localhost:9090/'. ").blue);
}
