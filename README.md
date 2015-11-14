# Convert to Geojson

## Install

- You need to install [Node.js](https://nodejs.org/en/).

```
  npm install convert2geojson
```

## Config example

- File name must be `convert2geojson.config.js`

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
