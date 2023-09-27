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

      var polygon = L.polygon([], {color: 'red'}).addTo(mymap);

    mymap.on('click', function(e){
      let latlng = e.latlng;
      polygon.addLatLng(latlng)
  })

  var masterPolygon = L.polygon([], {color: 'blue'}).addTo(mymap)
  var masterPolygonCoordinates = []
  mymap.on('dblclick', function(e){
     let clickedAllCoordinates = polygon.getLatLngs()
     console.log('clickAllCoordinates',clickedAllCoordinates)
     let clickedAllCoordinatesExceptTheLastOne = clickedAllCoordinates[0].slice(0, clickedAllCoordinates.length -1)
      console.log('clickAllCoordinatesExceptTheLastOne',clickedAllCoordinatesExceptTheLastOne)
     masterPolygonCoordinates.push(clickedAllCoordinatesExceptTheLastOne)
     masterPolygon.setLatLngs(masterPolygonCoordinates)
    // Remove all lat and lng values in the polygon object  
     polygon.setLatLngs([])

    
  })
  

}