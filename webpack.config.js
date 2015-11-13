var jsx_src = './js/src/';
var jsx_dist = './js/dist/';
var lib_src = './node_modules';

var webpack = require('webpack');

module.exports = {
    entry: {
        'index': jsx_src + 'index.jsx',
        'common': [
            lib_src + '/jquery/dist/jquery.js',
            lib_src + '/material-design-lite/material.js',
            lib_src + '/material-design-lite/material.css',
            lib_src + '/d3/d3.min.js',
            lib_src + '/leaflet/dist/leaflet.js',
            lib_src + '/leaflet/dist/leaflet-src.js',
            lib_src + '/leaflet/dist/leaflet.css'
        ]
    },
    output: {
        filename: '[name].min.js',
        path: jsx_dist,
        publicPath: '/js/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                query: {
                  presets: ['es2015']
                } 
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.png$/, loader: 'url-loader?limit=100000' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.min.css', '.min.js', '.json', '.html']
    },
    //plugins: [commonsPlugin, minifyPlugin]
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('common', 'common.min.js')
    ]
}
