function searchNearby(map, center) {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    location: center,
    radius: "500000", // Search within 5 km radius. Adjust as needed.
    type: ["doctor"], // You can specify type as 'hospital' or 'doctor'.
  };

  // service.nearbySearch(request, function (results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     clearMarkers();
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }
  //   }
  // });
  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearMarkers();
      for (var i = 0; i < results.length; i++) {
        var marker = new google.maps.Marker({
          map: map,
          position: results[i].geometry.location,
          title: results[i].name,
        });
        markers.push(marker);
      }
    }
  });
}

var markers = [];

function createMarker(place) {
  console.log(markers);
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
  });
  markers.push(marker);
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: -34.397, lng: 150.644 }, // Default location
  });

  var input = document.getElementById("locationInput");
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }

    map.setCenter(place.geometry.location);
    map.setZoom(14); // Adjust zoom level as needed

    searchNearby(map, place.geometry.location);
  });
}
