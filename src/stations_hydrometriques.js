// récupérer la case à cocher
const CHECKBOX = document.getElementById("hydro");

// layer où sont afficher les marqueurs symbolisant les stations
var STATION_LAYER;

// affichage de tous les marqueurs sur la carte
function montrerToutesLesStationsHydro() {

  // affichages des données ouvertes
  rapporterDonnéesStations().then((stationsHydro) => {

    // ajout de chaque marqueur
    STATION_LAYER = L.geoJSON(stationsHydro, {
        onEachFeature : montrerLaStation
      }).addTo(map);
  })
  
  // retirer les ombres des marqueurs
  map._panes.shadowPane.remove();
}

// affichage d'un seul marqueur sur la carte
function montrerLaStation(feature, layer) {
  console.log(feature.properties);
  layer.bindPopup(
      "<table><thead><tr><th colspan='2'>Informations</th></tr></thead><tbody><tr><td>Cours d'eau :</td><td>" + feature.properties.libelle_cours_eau + 
      "</td></tr><tr><td>Station :</td><td>" + feature.properties.libelle_station +
      "</td></tr><tr><td>URI :</td><td><a>" + feature.properties.uri_cours_eau + "</a></td></tr></tbody</table>");
  }

// masquage des marqueurs sur la carte
function cacherToutesLesStationsHydro() {
  STATION_LAYER.eachLayer((layer) => {
    layer.getElement().style.display ='none';
    layer.getElement().style.opacity = 0;
  });
}

// récupération des données ouvertes
async function rapporterDonnéesStations() {
    const response = await fetch('https://hubeau.eaufrance.fr/api/v1/hydrometrie/referentiel/stations?date_ouverture_station=2021-01-06&format=json&size=10000', {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.geo+json'    
        }
    });
    const stationsHydro = await response.json();
    return stationsHydro;
}

// Ajouter un écouteur d'événement à la case à cocher
CHECKBOX.addEventListener("change", function() {
  if (this.checked) {
    montrerToutesLesStationsHydro();
  } else {
    cacherToutesLesStationsHydro();
  }
});