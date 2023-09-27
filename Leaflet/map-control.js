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

    mymap.on('zoom', function(e){
      console.log(e.target._zoom)
    })

    mymap.on('resize', function (e) {
        console.log('The map has been resized');      //Event used in class map size change
    });

    mymap.on('resize', function (e) {          // Method in class how to use
        mymap.flyTo([0, 0]);             //Sets the view of the map (geographical center and zoom) performing
                                          //a smooth pan-zoom animation.
    });

    console.log(mymap.getPane('tilePane')); // Use getPane to get a specific pane, 'tilePane' in this case
}



  /*const mymap = L.map('mapid',{    // here used string in class
            center: [48,14],
            zoom: 4,
            layers:[
                  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{
                        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                  })
            ],

      })*/