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
        tbody.append('<tr><td colspan="5">Keine Daten gefunden</td></tr>');
        return;
    }

    data.forEach(function(user) {
        var row = $('<tr>');
        row.append($('<td>').html('<a href="#" class="user-link" data-id="' + user.id + '">' + user.firstname + ' ' + user.lastname + '</a>'));
        row.append($('<td>').text(user.email));
        row.append($('<td>').text(user.phone));
        row.append($('<td>').text(formatDate(user.birthdate)));
        row.append($('<td>').text(user.street));
        tbody.append(row);
    });

    // Event-Listener für die Benutzerlinks
    $('.user-link').on('click', function(e) {
        e.preventDefault(); // Verhindert das Standardverhalten des Links
        var userId = $(this).data('id'); // Holt die ID des Benutzers
        showUserDetails(userId); // Ruft die Funktion auf, um die Details anzuzeigen
    });
}

function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('de-DE'); // Gibt das Datum im deutschen Format zurück
}

function showUserDetails(userId) {
    $.ajax({
        url: 'get_data.php',
        method: 'GET',
        data: { id: userId },
        dataType: 'json',
        success: function(user) {
            if (user) {
                var detailsHtml = '<h3>Benutzerdetails (ID: ' + user.id + ')</h3>';
                detailsHtml += '<p><strong>Vorname:</strong> ' + user.firstname + '</p>';
                detailsHtml += '<p><strong>Nachname:</strong> ' + user.lastname + '</p>';
                detailsHtml += '<p><strong>E-Mail:</strong> ' + user.email + '</p>';
                detailsHtml += '<p><strong>Telefon:</strong> ' + user.phone + '</p>';
                detailsHtml += '<p><strong>Geburtsdatum:</strong> ' + formatDate(user.birthdate) + '</p>';
                detailsHtml += '<p><strong>Straße:</strong> ' + user.street + '</p>';
                $('#userDetails').html(detailsHtml).show(); // Zeigt die Details an
            } else {
                $('#userDetails').html('<p>Benutzer nicht gefunden.</p>').show();
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching user details:', error);
            $('#userDetails').html('<p>Fehler beim Laden der Benutzerdetails.</p>').show();
        }
    });
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
    $('#userDetails').hide(); // Versteckt die Benutzerdetails bei Leeren der Suche
}