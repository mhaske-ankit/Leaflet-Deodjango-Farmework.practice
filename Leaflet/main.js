window.onload = init;

function init() {
      // HTML Element
    const mapElement = document.getElementById('mapid');

      // BaseMaps
    const stadiamaps = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    const opentopomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    // Leaflet map object
    const mymap = L.map(mapElement, {
        center: [-35.67913588387836, 113.37890625000001],
        zoom: 4,
        minZoom: 4,
        layers: [stadiamaps],
    });
    // Base Map object
    const baseLayers = {
        'Stadia Maps': stadiamaps,
        'OpenTopoMap': opentopomap
    }

    // Overlays
    const perthBaseMapImage = './Data/perth_img.png'   // path of img
    const perthBaseMapBound = [[-35.67913588387836, 113.37890625000001], [-21.621143915312565, 136.14257812500003]]
    const imagePerthOverlay = L.imageOverlay(perthBaseMapImage,perthBaseMapBound)
    
    // Overlays object
    const overlayerLayers ={
      'perth image': imagePerthOverlay
    }

    // Layer Controls
    const layerControls = L.control.layers(baseLayers, overlayerLayers,{
      collapsed: false,
      position: 'topright'
     }).addTo(mymap);
    
      mymap.on('click', function(e){
       console.log(e.latlng)
    })
    // perth marker

    const perthMarker = L.marker([-31.905541455900366,  115.87280273437501],{
      title:'perth city',
      opacity:1
    }).addTo(mymap)
    // Popup
   const perthMarkerPopup = perthMarker.bindPopup('perth city is from popup').openPopup();  // when we remove .openPopup then we will click on perth then we see popup
   // Tooltip
   const perthMarkerTooltip = perthMarker.bindTooltip("perth city is from tooltip").openTooltip(); 


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


// In Above code we switch or we can choose maps between 2 maps and overlay satic map means display static map on base map
