 //setting the variables
var noLoc = document.getElementById('map');
var loc = navigator.geolocation;
var path = [];

//get the coordinates and update
function getLocation() {
	if (loc) {
		loc.watchPosition(showPosition);
	} else {
		noLoc.innerHTML = "Geolocation is not supported by this browser.";
	}
}

//show the current position
function showPosition(position) {
	
	//setting variables for latitude and longitude
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	
	//creating the map
	latlon = new google.maps.LatLng(lat,lon)
	path.push(latlon);
	mapholder = document.getElementById('mapholder')

	//map settings
	var myOptions = {
		center:path[0],
		zoom:50,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		mapTypeControl:false,
		navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL}
	}

	//placing the marker
	var map = new google.maps.Map(document.getElementById("mapholder"),myOptions);
	var markerIcon = {url: "markerIcon.png", anchor: new google.maps.Point(13,12)}
	var latlonBounds = new google.maps.LatLngBounds();

	//extend the size of the map relative to the current position
	for (var i = 0; i < path.length; i++) {
		latlonBounds.extend(path[i]);
		new google.maps.Marker({map: map, position: path[i], title: "Point " + (i + 1), icon: markerIcon});
	};

	//draw a line between the previous and current position
	var polyline = new google.maps.Polyline({map: map, path: path, strokeColor: '#0000FF', strokeOpacity: 0.7, strokeWeight: 4});

	//fit the size of the map relative to all positions
	map.fitBounds(latlonBounds);

	//save the position in the array 'path'
	document.getElementById('location').innerHTML = path;

}
