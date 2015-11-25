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
      zoom: 7
    },
    include: [
      {'data': {}}
    ]
  }
}
