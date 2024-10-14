<?php
require_once 'userdata.php';

header('Content-Type: application/json');

$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

if (empty($searchTerm)) {
    $data = getAllData();
} else {
    $data = getFilteredData($searchTerm);
}

echo json_encode($data);