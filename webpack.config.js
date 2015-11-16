var lib_src = './node_modules';

var webpack = require('webpack');
module.exports = {
    entry: {
        'convert2geojson': './bin/Map.js'
    },
    output: {
        filename: '[name].js',
        path: './simple-map/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                  presets: ['es2015']
                } 
            }
        ]
    }
}
