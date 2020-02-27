var countyMap = L.map('county-map-window').setView(
    [0, 0], 2
);
var apiToken = "pk.eyJ1Ijoibmdlbm92aWN0b3IzMjEiLCJhIjoiY2lmeWhzejVlMDJoaXU0bHp2NDcza2NteiJ9.xbQkW7UhxjnDXZT9ZQS1Rg"
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + apiToken, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: apiToken
}).addTo(countyMap);

var kenyanCountiesLayer;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'data/kenyan_counties.geojson');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.onload = function() {
    if (xhr.status !== 200) return
    var kenyanCountiesLayer = L.geoJSON(xhr.response,{
        style: {
            "color": "#ff7800",
            "weight": 2,
            "opacity": 0.65
        },
        onEachFeature: function(feature, layer){
            layer.bindPopup(feature.properties.ADM1_EN);
        }
    }).addTo(countyMap);
    countyMap.fitBounds(kenyanCountiesLayer.getBounds());
};
xhr.send();
