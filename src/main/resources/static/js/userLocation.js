
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.9622212,
            lng: -83.0028315
        },
        zoom: 13,
        //minZoom: 8,
        // mapTypeId: google.maps.MapTypeId.HYBRID,
    });
    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

//  add user map data to the map through the db
// call jason and parse it creating markers
//-------------------------------------------------------
$.get("locations/showLocations", function(userLocations){


 for (var i = 0; i < userLocations.length; i++) {
  var coords1 = userLocations[i].latitude;
  var coords2 = userLocations[i].longitude;
  var latLng = new google.maps.LatLng(coords1,coords2);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: userLocations[i].name,
    html:
    '<div style=" height: 100px;">'+
    '<h1>' + userLocations[i].name+'</h1>' + 
    '<h3>' + userLocations[i].type + '</h3>'+
    '<p>'+  userLocations[i].description + '</p>'+
    '</div>'
  });

//-----------------------------------
// displys information about location when user clicks
  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(this.html);
    infoWindow.open(map, this);
  });

} 


});


    // find geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}