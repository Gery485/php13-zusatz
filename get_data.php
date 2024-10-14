<?php
require_once 'db.data.php';

header('Content-Type: application/json');

if (isset($_GET['search'])) {
    $searchTerm = $_GET['search'];
    $data = getFilteredData($searchTerm);
} else {
    $data = getAllData();
}

echo json_encode($data);