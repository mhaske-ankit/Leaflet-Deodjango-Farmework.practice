// Geolocation API
window.onload = init;

function init() {
    const mapElement = document.getElementById('mapid');   // using HTML Element

    const mymap = L.map(mapElement, {
        center: [48, 14],
        zoom: 4,
        minZoom: 4,
        zoomSnap: 0.25,
        zoomDelta:0.25,
        easeLinearity:0.5,    // easily we can move or schroll mapp lef to right
        layers: [
            L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            })
        ]
    });

    // Geolocation API
    mymap.locate({setview:true, maxZoom:18})

    function onLocationFound(e){
      var radius = e.accuracy.toFixed(2);

      var locationMarker = L.marker(e.latlng).addTo(mymap)
       .bindPopup('you are within' + radius + 'metres from this point').openPopup()
       var locationCircle = L.circle(e.latlng, radius).addTo(mymap)
    
    }

    mymap.on('locationfound',onLocationFound);

    function onLocationError(e){
      window.alert(e.message)
    }
    mymap.on('locationerror',onLocationError);
}