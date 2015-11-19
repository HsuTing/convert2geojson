# Convert to Geojson

## Install

- You need to install [Node.js](https://nodejs.org/en/) (version >= 5.0.0).

```
  npm install convert2geojson
```

## Convert to geosjon

```
  ./node_modules/.bin/convert2geojson
```

## Open simple map

- You need to install those.

```
  npm install express proxy-middleware webpack webpack-dev-server file-loader html-loader url-loader
```

- Now, you can use this.
```
  ./node_modules/.bin/convert2geojson -test
```
- You can see your simple map at `http://localhost:9090/`.
- You need to modify `convert2geojson.config.js`. You can see [open a simple map](https://github.com/HsuTing/convert2geojson/wiki/Open-a-simple-map).

## Config example

- File name must be `convert2geojson.config.js`

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
- You can see other settings in [convert2geojson.config.js](https://github.com/HsuTing/convert2geojson/wiki).
- You must see [Input and Output Example](https://github.com/HsuTing/convert2geojson#input-and-output-example) at first time.

## Input and Output Example

- [json](https://github.com/HsuTing/convert2geojson/wiki#json)

## Feature

- [x] Convert every form to geojson.
- [x] Can choose personal properties.
- [x] File can be online or offline.
- [ ] File can be `json`, `csv`, `shapfile`.
- [x] Can open a simple map.
- [ ] In simple map, data can change on the basis of time.
- [ ] Customize style in simple map.
- [x] Can choose fields which should be included.
- [ ] Can reload config, If user add new file in `include`.
- [ ] Developer can add function before handling data.

## Issue

- Now, this program just can transform `json` to `geojson`.
- Can not compare `{}` and `[]`

## License

[MIT](https://github.com/HsuTing/convert2geojson/blob/master/LICENSE)
