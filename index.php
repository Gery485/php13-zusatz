<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benutzerdaten anzeigen</title>
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/index.js" defer></script>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        input[type="text"] {
            width: 200px;
            padding: 5px;
        }
        button {
            padding: 5px 10px;
            margin-left: 5px;
        }
    </style>
</head>
<body>

<h2>Benutzerdaten anzeigen</h2>

<div>
    <label for="search">Suche:</label>
    <input type="text" id="search" placeholder="Suche nach Name, E-Mail">
    <button id="searchButton">Suchen</button>
    <button id="clearButton">Leeren</button>
</div>

<table id="userTable">
    <thead>
    <tr>
        <th>Name</th>
        <th>E-Mail</th>
        <th>Geburtsdatum</th>
    </tr>
    </thead>
    <tbody>
    <!-- Daten werden hier dynamisch geladen -->
    </tbody>
</table>

<?php
require_once 'userdata.php';
?>

</body>
</html>