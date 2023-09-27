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
    const myCustomIcon = L.icon({
      iconUrl: './Data/map icon.png',
      iconSize: [30, 30],
      iconAnchor:[30, 30],
     popupAnchor:[0, -10]
    })
    var counter = 0
    var coordinates = []
    mymap.on('click', function(e){
      counter +=1;
      let latlng = e.latlng;
      coordinates.push(latlng)

      let popup = L.popup({
            autoClose: false,
            closeOnClick:false
      }).setContent(String(counter))    
    L.marker(latlng,{icon: myCustomIcon})
      .addTo(mymap)
      .bindPopup(popup)
      .openPopup()

      if (counter >=2){
        let distance = mymap.distance(coordinates[0], coordinates[1])
        console.log(distance)
        coordinates.shift()

      }
})

}