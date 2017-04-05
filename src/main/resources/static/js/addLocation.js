  var initialPosition;
  var usersPosition;
  var map;
  var marker;
  var infowindow;
  var messagewindow;



  function initMap() {
      navigator.geolocation.getCurrentPosition(function(position) {
          initialPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          console.log("1");
          map.setCenter(initialPosition);
      });
      map = new google.maps.Map(document.getElementById('map'), {
          center: initialPosition,
          zoom: 13
      });
      console.log("2");

      //The code below creates a new info window object that retrieves the form element on clicking a marker.
      infowindow = new google.maps.InfoWindow({
          content: document.getElementById('form')
      })

      console.log("3");
      //The code below creates a new info window object that retrieves the message element on saving the info window form.
      messagewindow = new google.maps.InfoWindow({
          content: document.getElementById('message')
      });

      console.log("4");

      /* when map is clicked, finds/centers user's location,
         and assigns that geolocation to created marker. */

      //The code block finds geolocation creates a marker when the user clicks the map.
      google.maps.event.addListener(map, 'click', function(event) {


          navigator.geolocation.getCurrentPosition(function(position) {
              var usersPosition = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };

              map.setCenter(usersPosition);

              marker = new google.maps.Marker({
                  position: usersPosition,
                  map: map,
                  icon: 'images/greyLocationMarker.png'
              });

              infowindow.open(map, marker);
              //The code below assigns a click listener to the marker which displays an info window when the user clicks the marker.
              // google.maps.event.addListener(marker, 'click', function() {
              //     infowindow.open(map, marker);
              // });
          });
      });


      $(document).ready(function() {

          $('#save-button').click(function(event) {
              // we don’t want the button to actually submit  --- we'll handle data submission via ajax
              event.preventDefault();




              var latlng = marker.getPosition();
              var type = $('#type :selected').val();


              $.ajax({ // Make an Ajax call to the server. HTTP verb = POST, URL = locations
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

                  alert("your recommendation has been added");


                  //clear form fields before infowindow is closed
                  $('#name').val('');
                  $('#description').val('');

                  //close info window
                  infowindow.close();
                  // messagewindow.open(map, marker);

                  //this should clear the fields
                  // $('#name').val('');
                  // $('#description').val('');

              });

          });
      });
  };


  //------------------------------------------------------------------------------------------
  //  Old Marker add location code is below
  //---------------------------------------------------------------------------------------
  //       var map;
  //       var marker;
  //       var infowindow;
  //       var messagewindow;

  //       function initMap() {
  //         var columbus = {lat: 39.9622212, lng: -83.0028315};
  //         map = new google.maps.Map(document.getElementById('map'), {
  //           center: columbus,
  //           zoom: 13
  //         });


  //         //The code below creates a new info window object that retrieves the form element on clicking a marker.
  //         infowindow = new google.maps.InfoWindow({
  //           content: document.getElementById('form')
  //         })


  //         //The code below creates a new info window object that retrieves the message element on saving the info window form.
  //         messagewindow = new google.maps.InfoWindow({
  //           content: document.getElementById('message')
  //         });


  //         //The code below assigns a click listener to the map with the addListener() callback function that creates a marker when the user clicks the map.
  //         google.maps.event.addListener(map, 'click', function(event) {
  //           marker = new google.maps.Marker({
  //             position: event.latLng,
  //             map: map
  //           });


  //           //The code below assigns a click listener to the marker which displays an info window when the user clicks the marker.
  //           google.maps.event.addListener(marker, 'click', function() {
  //             infowindow.open(map, marker);
  //           });
  //         });
  //       }


  // $(document).ready(function () {

  //       $('#save-button').click(function (event) {
  //     	// we don’t want the button to actually submit  --- we'll handle data submission via ajax
  //   	  event.preventDefault();




  //   	  var latlng = marker.getPosition();
  //   	  var type = $('#type :selected').val();


  //   	  $.ajax({			// Make an Ajax call to the server. HTTP verb = POST, URL = locations
  //   		  type: 'POST',
  //   		  url: '/locations',
  //   		  data: JSON.stringify({
  //   			name: $('#name').val(),
  //   			latitude: latlng.lat(),
  //   			longitude: latlng.lng(),
  //   			locationType: $('#type').val(),
  //   			description: $('#description').val()
  //   		  }),
  //   		  headers: {
  //   			'Accept': 'application/json',
  //   			 'Content-Type': 'application/json'
  //   		  },
  //   		'dataType': 'json'
  //   	  }).success(function(data, status) { // If the call succeeds, clear the form and reload the summary table

  //   		  alert(data);

  // 	  		infowindow.close();
  //             messagewindow.open(map, marker);

  //             //this should clear the fields
  //             $('#name').val('');
  //             $('#description').val('');

  //   	  });

  //    });

  // });
  ///---------------------------------------------------------------------------------------

  //The follow is code is no longer being used it should be removed when we are comfortable
  //    ----------------------------------------------------------------------------------

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
