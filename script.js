var mapOptions = {
    center: [16.0, 0.0],
    zoom: 2
}

var map = new L.map('map', mapOptions);

var layer = new L.TileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://osm.org">OSM contributors</a>, <a href="https://carto.com/">CARTO</a>'
});

map.addLayer(layer);

// burner test: will be remplaced by actual api later
fetch('snowing.json')
    .then(res => res.json())
    .then(geoJsonData => {
        const snowLayer = L.geoJSON(geoJsonData, {

            pointToLayer: function(feature, latlng) {
                const intensity = feature.properties.intensity || 1;
                const initialRadius = 10;

                const snowArea = L.circleMarker(latlng, {
                    radius: initialRadius,
                    stroke: false,
                    fillColor: '#A7DBFF',
                    fillOpacity: 0.1 + (intensity * 0.15),
                    interactive: true
                });

                const snowLucide = L.circleMarker(latlng, {
                    radius: initialRadius,
                    color: '#FFFFFF',
                    weight: 1,
                    opacity: 0.5,
                    fillColor: 'url(#snow-pattern)',
                    fillOpacity: 1,
                    interactive: true
                });

                const group = L.featureGroup([snowArea, snowLucide]);
                group.intensity = intensity;
                return group;
            },

            onEachFeature: function(feature, layer) {
                const props = feature.properties;
                const code = props.code;
                let weatherDescription = "snow!!!";
                if (code === 85 || code === 86) weatherDescription = "snow showers!!";
                if (code === 85 || code === 86) weatherDescription = "heavy snow!!!";

                layer.bindPopup(`
                    <div class="snow-popup">
                        there's <b>${weatherDescription}</b><br>
                        in <b>${props.name}, ${props.country}</b><br>
                        expected api wx code: ${code}
                    </div>
                    `);
            }
        }).addTo(map);

        function adaptSizing() {
            const currentZoom = map.getZoom();

            snowLayer.eachLayer(function(group) {
                const intensity = group.intensity || 1;

                let updRadius = (Math.pow(currentZoom, 1.5)) * intensity;
                if (updRadius < 5) updRadius = 5;
                if (updRadius > 200) updRadius = 200;

                group.eachLayer(layer => {
                    if(layer.setRadius) layer.setRadius(updRadius);
                });
            });
        }
        map.on('zoomend', adaptSizing);
        adaptSizing();
    });