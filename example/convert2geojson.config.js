module.exports = {
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
