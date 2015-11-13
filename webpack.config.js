var webpack = require('webpack');

module.exports = {
    entry: {
        'convert2geojson': './src/index.jsx'
    },
    output: {
        filename: '[name].js',
        path: './'
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
    //plugins: [commonsPlugin, minifyPlugin]
}
