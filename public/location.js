var reqcount = 0;

const watchId = navigator.geolocation.watchPosition(successCallback, erroCallback, options);

 async function successCallback(position) {
  const {accuracy, latitude, longitude, altitude, heading, speed} = position.coords;
  console.log(position);
//Show a map centered at latitude / longitude
reqcount++;
// const details = document.getElementById("details");
details.innerHTML = "Accuracy: " +accuracy+ "<br>";
details.innerHTML += "Latitude: " +latitude+ " | longitude " +longitude+ "<br>";
details.innerHTML += "Altitude: " +altitude+ "<br>";
details.innerHTML += "Heading: " +heading+ "<br>";
details.innerHTML += "Speed: " +speed+ "<br>";
details.innerHTML += "reqcount: " +reqcount;

const currentPosition = await postLocation({lat: latitude, long: longitude})
console.log(currentPosition);

}
 
function erroCallback(error) {

  //Display error based on the error code
  const {code} = error;
  switch (code) {
    case GeolocationPositionError.TIMEOUT :
      //Handle timeout
      alert("timeout");
      break;
    case GeolocationPositionError.PERMISSION_DENIED :
      //User denied the request
      alert("Please allow the location permission");
      break;
    case GeolocationPositionError.POSITION_UNAVAILABLE :
      //Position not available
      alert("Position not available");
      break;
  }
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function buttonClickHandler() {
  //cancel the updates when the user clicks on button
  navigator.geolocation.clearWatch(watchId);
}

async function postLocation(location) {
  const options = {
    method: "POST",
    headers: {"Content-type" : "application/json"},
    body: JSON.stringify(location)
  };

  const p = await fetch('/', options);
  const response = await p.json();
  return response;
 }