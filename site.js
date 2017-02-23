var sfMovies = new XMLHttpRequest();
var url = "http://localhost:8000/api/movies";
var markers = [];

function geocodeAddress(geocoder, map, arr, movieInfo) {
  var address = arr[i][1] + " San Francisco, CA";
	var actorOne = arr[i][2];
	var actorTwo = arr[i][3];
	var year = arr[i][4];
	var movieTitle = arr[i][5];
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
    	map.setCenter({lat: 37.758207, lng: -122.413060});
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
      	return function() {
          movieInfo.setContent("<strong>" + movieTitle + "</strong><br/> Released " +  year + "<br> Starring " + actorOne + " and " + actorTwo + "<br/>Scenes filmed at " +  address);
          movieInfo.open(map, marker);
        }
      })(marker, i));
    } else {
      //alert('Geocode was not successful for the following reason: ' + status + address);
    }
  });
}
function objs2Arr (arrayOfObjects, newArray) {
	for (let obj of arrayOfObjects) {
		obj = Array.from(Object.values(obj));
		newArray.push(obj);
	}
}
function removeBadArr (arrayOfArrays) {
	for (var i = (arrayOfArrays.length - 1); i >= 0; i--) {
		var specArr = arrayOfArrays[i]
		var index = arrayOfArrays.indexOf(specArr);
		if (specArr.length < 7 ) {
			arrayOfArrays.splice(index, 1);
		}
	}
}
sfMovies.open("GET", url, true);
sfMovies.send();
sfMovies.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
 		var info = JSON.parse(this.responseText);
		objs2Arr(info, markers);
		removeBadArr(markers);
		initMap(markers)
	}
}

//do not edit above this comment
function initMap(arr = markers) {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: {lat: 37.758207, lng: -122.413060}
	});
	var  movieInfo = new google.maps.InfoWindow();
	for( i = 0; i < arr.length; i++ ) {
		var geocoder = new google.maps.Geocoder();
		geocodeAddress(geocoder, map, arr, movieInfo);
  }
}
function filter (searchInput) {
	var newMarker = [];
	var search = searchInput
	newSearch = search.toLowerCase()
	for (let loc of markers) {
		for (let info of loc) {
			info = String(info);
			info = info.toLowerCase();
			var check = info.includes(newSearch);
			if(check) {
				newMarker.push(loc);
			}
			else {
				//alert('we may have an issue')
			}
		}
	}
	initMap(newMarker);
}
function validateForm() {
  var searchInput = document.forms["search"]["input"].value;
  console.log(searchInput);
  filter(searchInput);
  var params = "search="+ searchInput;
  var movieInput = new XMLHttpRequest();
  movieInput.open("POST", "http://localhost:8000/api/google", true);
  movieInput.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  movieInput.send(params);
  return false;
}
//var searchBar = document.getElementById("search");
//searchBar.addEventListener("keyup", filter);
