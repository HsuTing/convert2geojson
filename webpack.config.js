var webpack = require('webpack');
module.exports = {
    entry: {
        "index": './example/src/index.jsx',
        "index2": './example/src/index2.jsx'
    },
    output: {
        filename: '[name].js',
        path: './example/dist',
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
            { test: /\.png$/, loader: 'url-loader?limit=100000' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.min.css', '.min.js', '.png', '.jpg', '.html', '.json']
    },
    externals: {
      'jquery': '$',
      'leaflet': 'L'
    }
}
