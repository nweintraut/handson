

if(navigator.geolcation)
{
    // Start geolocation
} else {
    alert("Sorry geolocation not supported");
}

navigator.geolocation.getCurrentPosition(
    processGeolocation, geolocationError,
    { timeout: 0, maximumAge: Infinity, enableHighAccuracy: true
    }
);

watchId = navigator.geolocation.watchPosition (
    processGeolocation,
    geolocationError,
    {
        timeout: 0, maximumAge: Infinity, enableHightAccuracy: true}
);

function geolocationError(error) {
    
}

/*
    * maximumAge(ms) Max Age of cached position in milliseconds
    *        Throw error when value is reached
    *        "0" - do not use cache
    *        "Infinitiy" - returned any cached value (default)
    
    
    * timeout(ms) Max milliseconds to return a position
    *         Throw error if no value at timeout
    *         "Infinity" - don't return until position shows up (default)
    
    * enableHighAccuracy (boolean)
    * Try to obtain best possible result
    * If GPS available -- use it
    * If Geolocation is available
    * Requires an Internet connection
    
*/
    
// Options: Example Scenario #1
// {timeout: Infinity, maximumAge: Infinity, enableHighAccuracy: true}

// Options Exampl

// Options: Example Scenario #3
// {timeout: 3000, maximumAge: 0, enableHighAccuracy: true}


/*
Local
  html5Error: undefined
  position: Geoposition
    coords: Coordinates
      accuracy: 20 (meters)
      altitude: null
      altitudeAccuracy: null
      heading: null
      latitude: 39.919464
      longitude:
      speed:
      
*/
// Step 3: Process results
function processGeolocation(result){
    var lat     =;
    var long    =;
};

var timeStamp = result.timestamp;
var date = new Date(timeStamp);
console.log ();

/* No location returend?
- Let user know via an alert()
- Try again.
- Use an IP address Geocoder.
*/

/* Step 4: Display, sotre or analyze
- Display on map or in test
- Write to 


*/
// Step 5
navigator.geolcation.clearWatch(wathcId);
watchID = null;

// Step 6: Handling Error
function geolocationError(error) {
    var error_value = "null";
    switch(error.code){
        case 1:
            error_value = "PERMISSION DENIED";
            break;
        case 2: 
            error_value = "POSITION UNAVAILABLE";
            break;
        case 3: 
            error_value = "TIMEOUT";
            break;
    }
    alert("Unable to retri")
}
