# Convert to Geojson

## Install

- You need to install [Node.js](https://nodejs.org/en/).

```
  npm install convert2geojson
```

## Use

```
  ./node_modules/.bin/convert2geojson
```

## Config example

- File name must be `convert2geojson.config.js`
- `input`(You can add many file in here.) -> { (output filename): { url: (input file url), lon: (lon), lat: (lat)}}
- `filename` -> [name].(file extension)
- `path` -> output path
- `center` -> sample map`s center and zoom in
- `simpe` -> which file to include in simple map

```
module.exports = { 
  input: [
    {'try': { url: './input/test.json', lon: 'VillageLon', lat: 'VillageLat'}}
  ],  
  output: {
    filename: '[name].json',
    path: './output/'
  },  
  center: {
    lat: 23.619, 
    lon: 120.795,
    zoom: 8
  },  
  simple: [
    'try'
  ]
}
```

## Issue

- Now, this program just can transform `json` to `geojson`.
- Only point in `json` can be transform.

## License

[MIT](https://github.com/HsuTing/convert2geojson/blob/master/LICENSE)
