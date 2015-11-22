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
    }}  
  ],  
  output: {
    filename: '[name].json',
    path: './output/'
  }   
}
```

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
- [Demo](http://HsuTing.github.io/convert2geojson/).

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

## Input and Output Example

- [json](https://github.com/HsuTing/convert2geojson/wiki#json)

## Feature

- [x] Convert every form to geojson.
- [x] Can choose personal properties.
- [x] File can be online or offline.
- [ ] File can be `json`, `csv`, `shapfile`.
- [x] Can open a simple map.
- [x] Can filter data.
- [x] Customize style in simple map.
- [x] Can choose fields which should be included.
- [x] Developer can add function before handling data.

## Issue

- Now, this program just can transform `json` to `geojson`.
- Can not compare `{}` and `[]`

## License

[MIT](https://github.com/HsuTing/convert2geojson/blob/master/LICENSE)
