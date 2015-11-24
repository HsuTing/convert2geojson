# Convert to Geojson

## Install

- [Node.js](https://nodejs.org/en/) (version >= 5.0.0) must be installed.

```
  npm install convert2geojson
```

## Convert to geosjon

- Config.js must be named `convert2geojson.config.js`
```
module.exports = { 
  input: [
    {'try': {
      url: './input/test.json',
      symbol: {lon: 'Longitude', lat: 'Latitude', unit: { Village: "Village" }}
    }},
    {'temp': {
      url: './input/test.csv',
      symbol: {lon: 'Longitude', lat: 'Latitude'}
    }}
  ],  
  output: {
    filename: '[name].json',
    path: './output/'
  }   
}
```
- `url` can be a path or a link. If it is a link, you must add a format at the end. For example, `http://example.com` should be written as `http://example.com!json`.

- Convert to geojosn with:
```
  ./node_modules/.bin/convert2geojson
```

- Other settings are listed here: [convert2geojson.config.js](https://github.com/HsuTing/convert2geojson/wiki/convert2geojson.config.js).
- Read [Input and Output Example](https://github.com/HsuTing/convert2geojson#input-and-output-example) before first use.

## Simple map

- The following must be installed:
```
  npm install express proxy-middleware webpack webpack-dev-server file-loader html-loader url-loader
```

- Config.js must be named `convert2geojson.config.js`
```
module.exports = {
  output: {
    filename: '[name].geojson',
    path: './output/'
  },
  simple: {
    id: "map",
    center: {
      lat: 23.619, 
      lon: 120.795
    },  
    include: [
      {'try': {}} 
    ]
  }
}
```

- A simple map can be created with:
```
  ./node_modules/.bin/convert2geojson -test
```

- The map can be viewed at: `http://localhost:9090/`.
- Other details are listed here: [open a simple map](https://github.com/HsuTing/convert2geojson/wiki/Open-a-simple-map).
- [Demo](http://hsuting.github.io/convert2geojson/example/index2.html).

## Require convert2geojson

- `jquery` and `leaflet` must be added to your program
- If you require the function `Map`, you must add `material-design-lite` to your program.

```
var convert2geojson = require('convert2geojson');
var config = require('./convert2geojson.config.js');

(function() {
  convert2geojson.Map(config);
})();
```
- Other functions are listed here: [require convert2geojson](https://github.com/HsuTing/convert2geojson/wiki/require-convert2geosjon).
- [Example and demo](https://github.com/HsuTing/convert2geojson/wiki/require-convert2geosjon#example-code).

## Using convert2geojson in html

```
  <script src="./../convert2geojson-src.min.js"></script>
  <script>
    var config = {
      output: {
        filename: '[name].geojson',
        path: './data/'
      },
      simple: {
        id: "map",
        center: {
          lat: 23.619, 
          lon: 120.795,
          zoom: {
            normal: 10,
            min: 1,
            max: 17
          }
        },
        include: [
          {'data': {}}
        ]
      }
    }

    convert2geojson.Map(config);
  </script>
```
- [code](https://github.com/HsuTing/convert2geojson/blob/gh-pages/example/use-src.html) -> [demo](http://hsuting.github.io/convert2geojson/example/use-src.html)
- [convert2geojson-src.min.js](https://raw.githubusercontent.com/HsuTing/convert2geojson/master/convert2geojson-src.min.js)

## Input and Output Example

- [json](https://github.com/HsuTing/convert2geojson/wiki#json)
- [csv](https://github.com/HsuTing/convert2geojson/wiki#csv)

## Features

- [x] Convert every format to geojson.
- [x] Can choose personal properties.
- [x] Files can be online or offline.
- [x] Files can be `json` or `csv`.
- [x] Filter data.
- [x] Choose fields which should be included.
- [x] Developers can add functions before handling data.
- [x] Create a simple map.
- [x] Customize map styles.

## Issues

- Can not differentiate `{}` and `[]`

## License

[MIT](https://github.com/HsuTing/convert2geojson/blob/master/LICENSE)
