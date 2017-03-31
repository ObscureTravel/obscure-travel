
      var map;
      var marker;
      var infowindow;
      var messagewindow;

      function initMap() {
        var california = {lat: 37.4419, lng: -122.1419};
        map = new google.maps.Map(document.getElementById('map'), {
          center: california,
          zoom: 13
        });

        
        //The code below creates a new info window object that retrieves the form element on clicking a marker.
        infowindow = new google.maps.InfoWindow({
          content: document.getElementById('form')
        })

        
        //The code below creates a new info window object that retrieves the message element on saving the info window form.
        messagewindow = new google.maps.InfoWindow({
          content: document.getElementById('message')
        });

        
        //The code below assigns a click listener to the map with the addListener() callback function that creates a marker when the user clicks the map.
        google.maps.event.addListener(map, 'click', function(event) {
          marker = new google.maps.Marker({
            position: event.latLng,
            map: map
          });


          //The code below assigns a click listener to the marker which displays an info window when the user clicks the marker.
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
        });
      }

      
$(document).ready(function () {    
      
      $('save-button').click(function (event) {
    	// we don’t want the button to actually submit  --- we'll handle data submission via ajax
  	  event.preventDefault();
  	  var latlng = marker.getPosition();
  	  
  	  $.ajax({			// Make an Ajax call to the server. HTTP verb = POST, URL = locations
  		  type: 'POST',
  		  url: '/locations',
  		  data: JSON.stringify({
  			name: $('#name').val(),
  			latitude: latlng.lat(),
  			longitude: latlng.lng(),
  			locationType: $('#type').val(),
  			description: $('#description').val()
  		  }),
  		  headers: {
  			'Accept': 'application/json',
  			 'Content-Type': 'application/json'
  		  },
  		'dataType': 'json'	  
  	  }).success(function(data, status) { // If the call succeeds, clear the form and reload the summary table
  		  	
	  		infowindow.close();
            messagewindow.open(map, marker);
            
            //this should clear the fields
            $('#name').val('');
            $('#description').val('');
  		  
  	  });
    	  
   });
      
});
      
      
//      function saveData() {
//        var name = escape(document.getElementById('name').value);
//        var address = escape(document.getElementById('address').value);
//        var type = document.getElementById('type').value;
//        var latlng = marker.getPosition();
//        var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
//                  '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();
//
//        downloadUrl(url, function(data, responseCode) {
//
//          if (responseCode == 200 && data.length <= 1) {
//            infowindow.close();
//            messagewindow.open(map, marker);
//          }
//        });
//      }

//      function downloadUrl(url, callback) {
//        var request = window.ActiveXObject ?
//            new ActiveXObject('Microsoft.XMLHTTP') :
//            new XMLHttpRequest;
//
//        request.onreadystatechange = function() {
//          if (request.readyState == 4) {
//            request.onreadystatechange = doNothing;
//            callback(request.responseText, request.status);
//          }
//        };
//
//        request.open('GET', url, true);
//        request.send(null);
//      }

      function doNothing () {
      }

   