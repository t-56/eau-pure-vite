// Récupérer la case à cocher
const checkbox2 = document.getElementById("temperature");

// layer où sont afficher les marqueurs symbolisant les stations
var STATION_LAYER_2;

// affichage de tous les marqueurs sur la carte
function montrerToutesLesStationsTemperatureEau() {

  // affichages des données ouvertes
  fetchStationsTemperatureEauData().then((data2) => {
    
    // ajout de chaque marqueur
    STATION_LAYER_2 = L.geoJSON(data2, {
      onEachFeature : montrerLaStation2,
      pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng, geojsonMarkerOptions)
        }
        
    }).addTo(map);
  })

}

// affichage d'un seul marqueur sur la carte
const geojsonMarkerOptions = {
  radius: 2,
  fillColor: "red",
  color: "red",
  weight: 4,
  opacity: 1,
  fillOpacity: 0.8
}

// affichage d'un seul marqueur sur la carte
function montrerLaStation2(feature, layer) {
  console.log(feature.properties);
  layer.bindPopup(
      "<table><thead><tr><th colspan='2'>Informations</th></tr></thead><tbody><tr><td>Commune :</td><td>" + feature.properties.libelle_commune + 
      "</td></tr><tr><td>Station :</td><td>" + feature.properties.libelle_station +
      "</td></tr><tr><td>URI :</td><td><a>" + feature.properties.uri_cours_eau + "</a></td></tr></tbody</table>"
  );
  }

// récupération des données ouvertes
async function fetchStationsTemperatureEauData() {
    const response2 = await fetch('https://hubeau.eaufrance.fr/api/v1/temperature/station?date_debut_mesure=2022-01-01&exact_count=true&format=json&size=10000', {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.geo+json'    
        }
    });
    const data2 = await response2.json();
    return data2;
}

// Fonction à exécuter quand la case à cocher est décochée
function cacherToutesLesStationsTemperatureEau() {
  console.log("Le script est désactivé !");
  STATION_LAYER_2.eachLayer((layer) => {
    layer.getElement().style.display ='none';
    layer.getElement().style.opacity = 0;
  });
  
  

}

// Ajouter un écouteur d'événements à la case à cocher
checkbox2.addEventListener("change", function() {
  if (this.checked) {
    montrerToutesLesStationsTemperatureEau()
  } else {
    cacherToutesLesStationsTemperatureEau();
  }

});