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

```
module.exports = { 
  input: [
    {'try': { url: './input/test.json', lon: 'Lon', lat: 'Lat'}},
    {'temp': { url: 'http://example.com/test.json', lon: 'Lon', lat: 'Lat'}}
  ],  
  output: {
    filename: '[name].json',
    path: './output/'
  }  
}
```
## Config field explanation

- [x] input:
  - You can add many file in here.
  - `url` can be a path or a link.
  - Format:
```
  { (output filename): { url: (input file url), lon: (lon), lat: (lat)}}
```

- [x] filename:
  - `[name]` is stable. Do not change it.
  - Format:
```
[name].(file extension)
```

- [x] path:
  - Output files will be put in this folder.

- [ ] center:
  - Sample map`s center and the level of zoom in.

- [ ] simpe:
  - Files should be included in simple map.

## Issue

- Now, this program just can transform `json` to `geojson`.
- Only point in `json` can be transform.

## License

[MIT](https://github.com/HsuTing/convert2geojson/blob/master/LICENSE)
