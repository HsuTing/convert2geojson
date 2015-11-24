# Convert to Geojson

## Install

- You need to install [Node.js](https://nodejs.org/en/) (version >= 5.0.0).

```
  npm install convert2geojson
```

## Convert to geosjon

- You need a config.js whose name is `convert2geojson.config.js`
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
- `url` can be a path or a link. If it is a link, you need to add type after link. For example, if link is `http://example.com`, you should write `http://example.com!json`.

- Now, you can convert to geojosn.
```
  ./node_modules/.bin/convert2geojson
```

- You can see other settings in [convert2geojson.config.js](https://github.com/HsuTing/convert2geojson/wiki/convert2geojson.config.js).
- You must see [Input and Output Example](https://github.com/HsuTing/convert2geojson#input-and-output-example) at first time.

## Open simple map

- You need to install those.
```
  npm install express proxy-middleware webpack webpack-dev-server file-loader html-loader url-loader
```

- You need a config.js whose name is `convert2geojson.config.js`
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

- Now, you can open a simple map.
```
  ./node_modules/.bin/convert2geojson -test
```

- You can see your simple map at `http://localhost:9090/`.
- You can see detail in [open a simple map](https://github.com/HsuTing/convert2geojson/wiki/Open-a-simple-map).
- [Demo](http://hsuting.github.io/convert2geojson/example/index2.html).

## Require convert2geojson

- You need to add `jquery`, `leaflet` in your program.
- If you use function `Map`, you need to add `material-design-lite` in your program.

```
var convert2geojson = require('convert2geojson');
var config = require('./convert2geojson.config.js');

(function() {
  convert2geojson.Map(config);
})();
```
- You can see other function in [require convert2geojson](https://github.com/HsuTing/convert2geojson/wiki/require-convert2geosjon).
- [Example and demo](https://github.com/HsuTing/convert2geojson/wiki/require-convert2geosjon#example-code).

## Use convert2geojson in html

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

## Feature

- [x] Convert every form to geojson.
- [x] Can choose personal properties.
- [x] File can be online or offline.
- [x] File can be `json`, `csv`.
- [x] Can open a simple map.
- [x] Can filter data.
- [x] Customize style in simple map.
- [x] Can choose fields which should be included.
- [x] Developer can add function before handling data.

## Issue

- Can not compare `{}` and `[]`

## License

[MIT](https://github.com/HsuTing/convert2geojson/blob/master/LICENSE)
