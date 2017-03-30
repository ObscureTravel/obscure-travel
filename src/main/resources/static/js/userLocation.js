

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: {
//             lat: 39.9622212,
//             lng: -83.0028315
//         },
//         zoom: 20,
//         minZoom: 5,
//         // mapTypeId: google.maps.MapTypeId.HYBRID,
//     });
//     // var marker = new google.maps.Marker({
//     //         position: center,
//     //         map: map
//     //      });
//     var infoWindow = new google.maps.InfoWindow({
//         map: map
//     });










//         //$(document).ready(function(){

// //             map.data.loadGeoJson('data.json');
// // //(locations/showLocations, function(results){
// //  window.eqfeed_callback = function(results) {

// //       for (var i = 0; i < results.length; i++) {
// //        var coords1 = results[i].latitude;
// //        var coords2 = results[i].longitude;
// //         var latLng = new google.maps.LatLng(coords1,coords2);
// //         var marker = new google.maps.Marker({
// //         position: latLng,
// //           map: map
//         //  title: i.name,
// //              
// //            // html: 
// //            //     '<div class="markerPop">' 
// //            //     '<h1>'  theLocation.name'</h1>'  //substring removes distance from title
// //            //     '<h3>'  theLocations.address '</h3>' 
// //            //     '<p>'  theLocations.locationType  '</p>' 
// //            //     '<p>'  theLocations.locationType  '</p>' 
// //            //     '</div>'
// //          });
 
// //   console.log(coords1);
// // }
// //        console.log(results+ "yes");
// // }
// //   console.log(results.length);
// //  });
// //});
//    // });



// //-------------------------

//    // function initMap() {
//    //      var uluru = {lat: 39.9363, lng: -83.044};
//    //      var map = new google.maps.Map(document.getElementById('map'), {
//    //        zoom: 10,
//    //        center: uluru

//         });
          
//           var marker = new google.maps.Marker({
//             position: center,
//             map: map
//           });
          
          
//       //  $.get("locations/showLocations", function(results){
           
           
//       //      for (var i = 0; i < results.length; i++) {
//       //     var coords1 = results[i].latitude;
//       //     var coords2 = results[i].longitude;
//       //     var latLng = new google.maps.LatLng(coords1,coords2);
//       //     var marker = new google.maps.Marker({
//       //       position: latLng,
//       //       map: map
//       //     });
             
        
//       // }
             
//       //        });
          
//       }























    // find geolocation
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };
//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Location found.');
//             map.setCenter(pos);
//         }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//         });
//     } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//     }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
// }