$(document).ready(function() {

    $.get("/user/name", function(data) {

        var userName = JSON.parse(data);

        $.each(userName, function(key, value) {

            // below we'll append 'value' to specific DIV
            console.log(value);
        });

    });

});
