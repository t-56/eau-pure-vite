// Récupérer la case à cocher
const checkbox3 = document.getElementById("local");

// layer où sont afficher les marqueurs symbolisant les stations
var STATION_LAYER_3;

// affichage de tous les marqueurs sur la carte
function montrerToutesLesStationsLocal() {

  // affichages des données ouvertes
  fetchStationsLocal().then((data3) => {
    
    // ajout de chaque marqueur
    STATION_LAYER_3 = L.geoJSON(data3, {
      onEachFeature : montrerLaStation3,
      pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng, geojsonMarkerOptions2)
        }
        
    }).addTo(map);
  })

}

// affichage d'un seul marqueur sur la carte
const geojsonMarkerOptions2 = {
  radius: 2,
  fillColor: "orange",
  color: "orange",
  weight: 4,
  opacity: 1,
  fillOpacity: 0.8
}

// affichage d'un seul marqueur sur la carte
function montrerLaStation3(feature, layer) {
  console.log(feature.properties);
  layer.bindPopup(
      "<table><thead><tr><th colspan='2'>Informations</th></tr></thead><tbody><tr><td>Commune :</td><td>" + feature.properties.libelle_commune + 
      "</td></tr><tr><td>Station :</td><td>" + feature.properties.libelle_station +
      "</td></tr><tr><td>URI :</td><td><a>" + feature.properties.uri_cours_eau + "</a></td></tr></tbody</table>"
  );
  }

// récupération des données ouvertes
async function fetchStationsLocal() {
    const response3 = await fetch('stations.php', {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.geo+json'    
        }
    });
    const data3 = await response3.json();
    return data3;
}

// Fonction à exécuter quand la case à cocher est décochée
function cacherToutesLesStationsLocal() {
  console.log("Le script est désactivé !");
  STATION_LAYER_3.eachLayer((layer) => {
    layer.getElement().style.display ='none';
    layer.getElement().style.opacity = 0;
  });
  
  

}

// Ajouter un écouteur d'événements à la case à cocher
checkbox3.addEventListener("change", function() {
  if (this.checked) {
    montrerToutesLesStationsLocal()
  } else {
    cacherToutesLesStationsLocal();
  }

});