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
      //Drawing polylines dynamically
      var latlngs = [
            [45.51, -122.68],
            [37.77, -122.43],
            [34.04, -118.2]
        ];

        var polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);
        mymap.fitBounds(polyline.getBounds())

        var lineCoordinates = [];
        var drawPolyline = L.polyline([], {color: 'red'}).addTo(mymap)

        mymap.on('click', function(e){
            let latlng = e.latlng;
            lineCoordinates.push(latlng)

            if (lineCoordinates.length > 1){
                  drawPolyline.setLatLngs(lineCoordinates)

            }
        })
        // Drawing multiple polylines dynamically

        var polyline = L.polyline([], {
            color: 'red'
      }).addTo(mymap)

        mymap.on('click', function(e){
            let latlng = e.latlng;
            drawPolyline.addLatLng(latlng)
        })

        var masterPolyLine = L.polyline([], {color: 'blue'}).addTo(mymap)
        var masterLineCoordinates = []
        mymap.on('dblclick', function(e){
           let clickedAllCoordinates = drawPolyline.getLatLngs()
           let clickedAllCoordinatesExceptTheLastOne = clickedAllCoordinates.slice(0, clickedAllCoordinates.length -1)

           masterLineCoordinates.push(clickedAllCoordinatesExceptTheLastOne)
           masterPolyLine.setLatLngs(masterLineCoordinates)

           drawPolyline.setLatLngs([])

          console.log(masterPolyLine.toGeoJSON())
        })
        
}