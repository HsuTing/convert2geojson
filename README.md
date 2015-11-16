# Convert to Geojson

## Install

- You need to install [Node.js](https://nodejs.org/en/) (version >= 5.0.0).

```
  npm install convert2geojson
```

## Use

```
  ./node_modules/.bin/convert2geojson
```

If you want to see your data on a simple map, you can do this.

```
  ./node_modules/.bin/convert2geojson -test
```

## Config example

- File name must be `convert2geojson.config.js`

```
module.exports = { 
  input: [
    {'try': {
      url: './input/test.json',
      symbol: {lon: 'Longitude', lat: 'Latitude'}
    }}  
  ],  
  output: {
    filename: '[name].json',
    path: './output/'
  }   
}
```
You can see other setting in [wiki](https://github.com/HsuTing/convert2geojson/wiki).

## Feature

- [x] Convert evey form to geojson.
- [x] Can choose personal properties.
- [x] File can be online or offline.
- [ ] File can be `json`, `csv`, `shapfile`.
- [x] Can open a simple map.
- [ ] In simple map, data can change on the basis of time.
- [ ] Customize style in simple map.
- [ ] Can choose fields which should be included.
- [ ] Can reload config, If user add new file in `include`.

## Issue

- Now, this program just can transform `json` to `geojson`.
- Only point in `json` can be transform.
- Same field name shoulde be in array.

## License

[MIT](https://github.com/HsuTing/convert2geojson/blob/master/LICENSE)
