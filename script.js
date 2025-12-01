var mapOptions = {
    center: [16.0, 0.0],
    zoom: 2
}

var map = new L.map('map', mapOptions);

var layer = new L.TileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://osm.org">OSM contributors</a>, <a href="https://carto.com/">CARTO</a>'
});

map.addLayer(layer);

fetch('https://api.arewesnowing.lolodotzip.tech/snowing.json?t=' + Date.now())
    .then(res => res.json())
    .then(data => {
        const geoJsonData = data.features;
        const nextRefresh = new Date(data.next_refresh);
        const buildDate = new Date(data.generated);
        const readableBuild = buildDate.toLocaleString();

        const lastBuild = document.getElementById('last_upd_refresh');
        if (lastBuild){
            lastBuild.textContent = `${readableBuild}`;
        }

        const countdown = document.getElementById('countdown_refresh');
        function updateCountdown() {
            const diff = nextRefresh - new Date();
            if(diff <= 0){
                countdown.textContent = "pretty soon!! (prob building rn)";
                return;
            }

            const hours = Math.floor(diff / 1000 / 60 / 60);
            const minutes = Math.floor(diff / 1000 / 60) % 60;
            countdown.textContent = `in ${hours}h ${minutes}min`
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);

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
                const temp = props.temperature;
                const unit = props.temperature_unit ?? "°C";

                let weatherDescription = "snow!!!";
                if (code === 85 || code === 86) weatherDescription = "snow showers!!";
                if (code === 85 || code === 86) weatherDescription = "heavy snow!!!";

                layer.bindPopup(`
                    <div class="snow-popup">
                        there's <b>${weatherDescription}</b><br>
                        in <b>${props.name}, ${props.country}</b><br>
                        with currently ${temp}${unit}
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