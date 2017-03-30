 function initMap() {
  //var myLatLng = {lat: 39.5740, lng: -82.5956};

  var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.9622212,
            lng: -83.0028315
        },       
         
        zoom: 20,
        minZoom: 8,
        // mapTypeId: google.maps.MapTypeId.HYBRID,
    });
    var infoWindow = new google.maps.InfoWindow({
        map: map
    });


      $.get("locations/showLocations", function(results){
           
           
           for (var i = 0; i < results.length; i++) {
          var coords1 = results[i].latitude;
          var coords2 = results[i].longitude;
          var latLng = new google.maps.LatLng(coords1,coords2);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
             
        
      }
             
             });
    }