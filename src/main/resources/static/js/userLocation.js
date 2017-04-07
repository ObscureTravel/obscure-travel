var LocationFilter= $("#filtermap").val()
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


//filter map locations-  
$("#filtermap").change(function(event){
   LocationFilter= $("#filtermap").val()
    event.preventDefault();
});//filter map function

    if (LocationFilter == "All"){

       $.get("locations/showLocations", function(userLocations){
        displaySelectedLocations(userLocations);
    });
   }else{
    $.get("locations/showbytype/"+LocationFilter, function(userLocations){
        displaySelectedLocations(userLocations);
    });
}



function displaySelectedLocations(userLocations){
    //alert("im working");
    for (var i = 0; i < userLocations.length; i++) {
      var coords1 = userLocations[i].latitude;
      var coords2 = userLocations[i].longitude;
 // var testId = userLocations[i].id;
 var latLng = new google.maps.LatLng(coords1,coords2);
 var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: userLocations[i].name,
    html:
    '<div style=" height: 100%;">'+
    '<h1>' + userLocations[i].name+'</h1>' + 
    '<p>' + userLocations[i].locationType + '</p>'+
    '<p>'+  userLocations[i].description + '</p>'+
    '<input id="testTest" type="hidden" value="' + userLocations[i].id + '" />' + 
    '<input id="testLatitude" type="hidden" value="' + coords1 + '" />' + 
    '<input id="testLongitude" type="hidden" value="' + coords2 + '" />' + 
    '<button id="edit-button-modal" type="button" data-toggle="modal" data-target="#edit-modal">' + 'Edit' + '</button>' +
    '</div>'

    
});

//-----------------------------------
// displys information about location when user clicks
google.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(this.html);
    infoWindow.open(map, this);
});

} 
}




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



//this will display the location details

$('#edit-modal').on('show.bs.modal', function (event) {
	
	

  var element = $(event.relatedTarget);
  var locationId = $('#testTest').val();

  var modal = $(this);

  $.ajax({
     type: 'GET',
     url: '/locations/' + locationId, 
     success: function (location) {
        modal.find('#edit-name').val(location.name);
        modal.find('#edit-description').val(location.description);
        modal.find('#edit-type').val(location.locationType);

    }
});

});

//this will update user location.

$('#update-button').click(function(event) {
	
	event.preventDefault();
	
    //This checked to make sure all filled are filled out
    if (validateForm()){ 
    	
    	var locationId = $('#testTest').val(); //this gets the hidden id value
    	
    	
    	//ajax call gets the value and PUT in json and send back to the DB
    	$.ajax({
    		type: 'PUT',
    		url: '/locations/location/' + locationId, 
    		data: JSON.stringify({
               id: locationId,
               name: $('#edit-name').val(),
               latitude: $('#testLatitude').val(),
               longitude: $('#testLongitude').val(),
               locationType: $('#edit-type').val(),
               description: $('#edit-description').val()
           }), headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
         'dataType': 'json'

     }).done(function() {

    		$('#edit-modal').modal('hide'); //this hides the model after update is clicked.
    		location.reload(); //this will refresh the page
    		
    	});

 }

});

function validateForm() {
    var name = $('#edit-name').val();
    var description = $('#edit-description').val();
    var type = $('#edit-type').val();
    
    if (name == "" || description == "" || type == ""){ 
    	alert('all fields must be filled');
    	return false;
    }else {
        return true;
    }
}



//   function displaySelectedLocations(userLocations){
//     //alert("im working");
//        for (var i = 0; i < userLocations.length; i++) {
//           var coords1 = userLocations[i].latitude;
//           var coords2 = userLocations[i].longitude;
//  // var testId = userLocations[i].id;
//  var latLng = new google.maps.LatLng(coords1,coords2);
//  var marker = new google.maps.Marker({
//     position: latLng,
//     map: map,
//     title: userLocations[i].name,
//     html:
//     '<div style=" height: 100%;">'+
//     '<h1>' + userLocations[i].name+'</h1>' + 
//     '<p>' + userLocations[i].locationType + '</p>'+
//     '<p>'+  userLocations[i].description + '</p>'+
//     '<input id="testTest" type="hidden" value="' + userLocations[i].id + '" />' + 
//     '<input id="testLatitude" type="hidden" value="' + coords1 + '" />' + 
//     '<input id="testLongitude" type="hidden" value="' + coords2 + '" />' + 
//     '<button id="edit-button-modal" type="button" data-toggle="modal" data-target="#edit-modal">' + 'Edit' + '</button>' +
//     '</div>'


// });

// //-----------------------------------
// // displys information about location when user clicks
// google.maps.event.addListener(marker, 'click', function () {
//     infoWindow.setContent(this.html);
//     infoWindow.open(map, this);
// });

// } 
// }