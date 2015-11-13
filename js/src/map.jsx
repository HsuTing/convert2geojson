import d3 from 'd3';
import L from 'leaflet';

export function init(map) {
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 17, 
    attribution: "Imagery from <a href=\"http://giscience.uni-hd.de/\">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
    id: "hsuting.o5ag6mm2",
    accessToken: "pk.eyJ1IjoiaHN1dGluZyIsImEiOiJRajF4Y0hjIn0.9UDt8uw_fxEX791Styd-lA"
  }).addTo(map);
}

export function setPlace(map) {
  function setPosition(position) {
    map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
}

export function resetView(map, center) {
  map.setView(new L.LatLng(center.lat, center.lon), 8);
};

export function addData(map, config) {
  let icon = L.icon({
    iconUrl: 'img/marker-icon.png',
    shadowUrl: 'img/marker-shadow.png',
    iconAnchor: [22, 94],
    popupAnchor: [-10, -86],
    shadowAnchor: [22, 94] 
  });

  for(let i in config.files) {
    d3.json(config.path + "/" + config.files[i], function(data) {
      L.geoJson(data, {
        onEachFeature(feature, layer) {
          let html = ""; 
          for(let key in feature.properties) {
            html += key + "： " + feature.properties[key] + "<br/>";
          }   
          layer.bindPopup(html);
        },  
        pointToLayer(feature, point) {
          let marker = L.marker(point, {icon: icon});
          return marker;
        }
      }).addTo(map);
    });
  }
}
