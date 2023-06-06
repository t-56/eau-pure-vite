<?php
// Configuration de la connexion à la base de données
$servername = "localhost:5173";   // Remplacez par l'adresse de votre serveur MariaDB
$username = "";    // Remplacez par votre nom d'utilisateur
$password = "";    // Remplacez par votre mot de passe
$dbname = "eau_pure";   // Remplacez par le nom de votre base de données

// Établir la connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Erreur de connexion à la base de données : " . $conn->connect_error);
}

// Exécuter la requête SQL
$sql = "SELECT * FROM stations";   // Remplacez par votre requête SQL
$result = $conn->query($sql);

// Vérifier si des résultats ont été obtenus
if ($result->num_rows > 0) {
    $rows = array();

    // Parcourir les résultats de la requête
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    // Convertir les résultats en format JSON
    $jsonData = json_encode($rows);

    // Faire quelque chose avec les données JSON (par exemple, les renvoyer en réponse à une requête HTTP)
    echo $jsonData;
} else {
    echo "Aucun résultat trouvé.";
}

// Fermer la connexion à la base de données
$conn->close();
?>
