$(document).ready(function() {
    loadData();
    initializeButtons();
});

function loadData(searchTerm = '') {
    $.ajax({
        url: 'get_data.php',
        method: 'GET',
        data: { search: searchTerm },
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

    if (data.length === 0) {
        tbody.append('<tr><td colspan="3">Keine Daten gefunden</td></tr>');
        return;
    }

    data.forEach(function(user) {
        var row = $('<tr>');
        row.append($('<td>').text(user.firstname + ' ' + user.lastname));
        row.append($('<td>').text(user.email));
        row.append($('<td>').text(formatDate(user.birthdate)));
        tbody.append(row);
    });
}

function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
}

function initializeButtons() {
    $('#searchButton').on('click', searchData);
    $('#clearButton').on('click', clearSearch);
}

function searchData() {
    var searchTerm = $('#search').val();
    loadData(searchTerm);
}

function clearSearch() {
    $('#search').val('');
    loadData();
}