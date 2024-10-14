$(document).ready(function() {
    loadData();
    initialize();
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
    var tbody = $('.users tbody');
    tbody.empty();

    data.forEach(function(user) {
        var row = $('<tr>');
        row.append($('<td>').text(user.firstname + ' ' + user.lastname));
        row.append($('<td>').text(user.email));
        row.append($('<td>').text(user.birthdate));
        tbody.append(row);
    });
}

function initialize() {
    document.getElementById("filter").onkeyup = filterRows;
}

function filterRows() {
    var filter = document.getElementById("filter").value.toLowerCase();

    if (filter == "") {
        $('.users tr').each(function (i, row) {
            if (i > 0) {
                $(row).show();
            }
        });
    } else {
        $('.users tr').each(function (i, row) {
            // ignore header row
            if (i > 0) {
                var $row = $(row);  // convert to object

                var name = $row.find('td:nth-child(1)').text().toLowerCase();
                var email = $row.find('td:nth-child(2)').text().toLowerCase();

                if (name.indexOf(filter) >= 0 || email.indexOf(filter) >= 0) {
                    $row.show();
                } else {
                    $row.hide();
                }
            }
        });
    }
}