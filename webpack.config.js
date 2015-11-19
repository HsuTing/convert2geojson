var lib_src = './node_modules/convert2geojson/';

var webpack = require('webpack');
module.exports = {
    entry: {
        "index": [
            lib_src + '/bin/Map.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:9090'
        ]
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/simple-map',
        publicPath: "http://localhost:9090/simple-map/"
    },
    module: {
        loaders: [
            { test: /\.png$/, loader: 'url-loader?limit=100000' }
        ]
    },
    externals: {
      'jquery': '$',
      'leaflet': 'L'
    }
}
