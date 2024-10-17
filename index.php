<?php
require_once 'userdata.php';

function getAllData() {
    global $data;
    return $data;
}

function getFilteredData($filter) {
    $allData = getAllData();
    return array_filter($allData, function($user) use ($filter) {
        $fullName = strtolower($user['firstname'] . ' ' . $user['lastname']);
        $email = strtolower($user['email']);
        $filterLower = strtolower($filter);
        return strpos($fullName, $filterLower) !== false || strpos($email, $filterLower) !== false;
    });
}

$filter = isset($_GET['filter']) ? $_GET['filter'] : '';
$users = $filter ? getFilteredData($filter) : getAllData();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Data</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .table-striped tbody tr:nth-of-type(odd) {
            background-color: rgba(0,0,0,.05);
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <h1>User Data</h1>
        <form action="" method="GET" class="mb-4">
            <div class="input-group">
            <input type="text" name="filter" class="form-control" placeholder="Search by name or email" value="<?= htmlspecialchars($filter) ?>">
                <button type="submit" class="btn btn-primary">Search</button>
                <a href="index.php" class="btn btn-secondary">Clear</a>
            </div>
        </form>

        <?php if (empty($users)): ?>
            <div class="alert alert-warning">No users found.</div>
        <?php else: ?>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Birthdate</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user): ?>
                        <tr>
                        <td><a href="details.php?id=<?= $user['id'] ?>&filter=<?= urlencode($filter) ?>"><?= htmlspecialchars($user['firstname'] . ' ' . $user['lastname']) ?></a></td>
                            <td><?= htmlspecialchars($user['email']) ?></td>
                            <td><?= htmlspecialchars($user['phone']) ?></td>
                            <td><?= date('d.m.Y', strtotime($user['birthdate'])) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('input[name="filter"]').on('input', function() {
                var filter = $(this).val().toLowerCase();
                $('tbody tr').each(function() {
                    var name = $(this).find('td:first-child').text().toLowerCase();
                    var email = $(this).find('td:nth-child(2)').text().toLowerCase();
                    if (name.indexOf(filter) > -1 || email.indexOf(filter) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });
        });
    </script>
</body>
</html>