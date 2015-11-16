var lib_src = './node_modules';

var webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: {
        "index": [
            './bin/Map.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:9090'
        ],
        'common': [
            lib_src + '/jquery/dist/jquery.js',
            lib_src + '/leaflet/dist/leaflet.js',
            lib_src + '/leaflet/dist/leaflet-src.js',
            lib_src + '/leaflet/dist/leaflet.css',
            lib_src + '/material-design-lite/material.js',
            lib_src + '/material-design-lite/material.css',
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
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.png$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
    ]
}
