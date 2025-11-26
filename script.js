var mapOptions = {
    center: [15.0, 0.0],
    zoom: 2
}

var map = new L.map('map', mapOptions);

var layer = new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');

map.addLayer(layer);