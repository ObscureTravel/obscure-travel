
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
			//console.log(userLocations[i])
 //var sammy =userLocations[i]
			//console.log(sammy);
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
				'<div id="location-Reviews" type="hidden" value="' + userLocations[i] + '" ><div/>' +   //this will capture reviews Collection
				'<input id="testTest" type="hidden" value="' + userLocations[i].id+ '" />' + 
				'<input id="testLatitude" type="hidden" value="' + coords1 + '" />' + 
				'<input id="testLongitude" type="hidden" value="' + coords2 + '" />' + 
				'<button id="edit-button-modal" type="button" data-toggle="modal" data-target="#edit-modal">' + 'Edit' + '</button>' +
				'<button id="review-button-modal" type="button" data-toggle="modal" data-target="#review-modal">' + 'Reviews' + '</button>' +
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


//this will display the Review Modal.

$('#review-modal').on('show.bs.modal', function (event) {

	var element = $(event.relatedTarget);
	document.getElementById("review-content").placeholder = "Add your Reviews about this place Here!!";
	var reviewDiv = $('#reviews-div');

	var id = $('#testTest').val();


	$.get("locations/"+id, function(eachData){// get the location information for each marker when clicked	
	$('#review-location').val(eachData)
	
		});	 


	$.get("reviews/review/"+ id, function(locationReviews){
		
		$("#reviews-div").html("");// empties the Modal when it is opened

		for (var i = 0; i < locationReviews.length; i++) {

			html = '';

			html +=	'<h3>' +locationReviews[i].userName +'</h3>\n'; 
			html += '<p>' + locationReviews[i].content + '</p>\n';

			reviewDiv.append(html);
			
		} 

	});	 
});


$('#add-Review').click(function(event) {
	
//console.log($('#review-location').val())

		event.preventDefault();
	$.ajax({
		type: 'POST',
		url: '/reviews',
		data: JSON.stringify({
			userName: $('#reviewer-name').val(),
			content: $('#review-content').val(),
			location: $('#review-location').val()
			
		}),

		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},'dataType': 'json'
	}).done(function() {

	$('#edit-modal').modal('hide'); //this hides the model after update is clicked.
	
	location.reload(); //this will refresh the page
	
	});


});
	  