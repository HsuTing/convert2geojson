# Convert to Geojson

## Start

- You need to install [Node.js](https://nodejs.org/en/).

- Install node modules.

```
  npm install -i
```

- Use webpack.

```
  ./node_modules/.bin/webpack
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
