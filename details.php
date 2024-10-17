<?php
require_once 'userdata.php';

function getDataPerId($id) {
    global $data;
    foreach ($data as $user) {
        if ($user['id'] == $id) {
            return $user;
        }
    }
    return null;
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$user = getDataPerId($id);
$filter = isset($_GET['filter']) ? $_GET['filter'] : '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Details</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1>User Details</h1>
        <a href="index.php?filter=<?= urlencode($filter) ?>" class="btn btn-secondary mb-3">Back to List</a>

        <?php if ($user): ?>
            <table class="table">
                <tr>
                    <th>ID</th>
                    <td><?= htmlspecialchars($user['id']) ?></td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td><?= htmlspecialchars($user['firstname'] . ' ' . $user['lastname']) ?></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td><?= htmlspecialchars($user['email']) ?></td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td><?= htmlspecialchars($user['phone']) ?></td>
                </tr>
                <tr>
                    <th>Birthdate</th>
                    <td><?= date('d.m.Y', strtotime($user['birthdate'])) ?></td>
                </tr>
                <tr>
                    <th>Street</th>
                    <td><?= htmlspecialchars($user['street']) ?></td>
                </tr>
            </table>
        <?php else: ?>
            <div class="alert alert-danger">User not found.</div>
        <?php endif; ?>
    </div>
</body>
</html>