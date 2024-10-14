$(document).ready(function() {
    loadData();
    initializeSearch();
});

function loadData() {
    $.ajax({
        url: 'get_data.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            displayData(data);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

function displayData(data) {
    var tbody = $('#userTable tbody');
    tbody.empty();

    data.forEach(function(user) {
        var row = $('<tr>');
        row.append($('<td>').text(user.firstname + ' ' + user.lastname));
        row.append($('<td>').text(user.email));
        row.append($('<td>').text(user.birthdate));
        tbody.append(row);
    });
}

function initializeSearch() {
    $('#search').on('keyup', function() {
        var searchTerm = $(this).val().toLowerCase();
        $('#userTable tbody tr').each(function() {
            var text = $(this).text().toLowerCase();
            $(this).toggle(text.indexOf(searchTerm) > -1);
        });
    });
}

function searchData() {
    var searchTerm = $('#search').val();
    loadData(searchTerm);
}

function clearSearch() {
    $('#search').val('');
    loadData();
}