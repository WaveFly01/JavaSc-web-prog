if (document.readyState !== "loading") {
    console.log("Document is ready!");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("Document is ready after waiting!");
        initializeCode();
    });
}

async function initializeCode() {
    var DivMap = document.getElementById("map");


    const response = await fetch('https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326');
    const data = await response.json();

    const positiveResponse = await fetch('https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f');
    const positiveData = await positiveResponse.json();

    const negativeResponse = await fetch('https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e');
    const negativeData = await negativeResponse.json();

    var map = L.map('map', {
        minZoom: -3,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var geoJSONLayer = L.geoJSON(data, {
        weight: 2,
        onEachFeature: function (feature, layer) {
            layer.bindTooltip(feature.properties.nimi);
        }
    }).addTo(map);



    map.fitBounds(geoJSONLayer.getBounds());
    map.getContainer().style.height = '97vh';
    DivMap.appendChild(map.getContainer());
}
