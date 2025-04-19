
function getLocationAndSend() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      sendData(position.coords.latitude, position.coords.longitude);
    }, () => {
      sendData("Permission denied", "Permission denied");
    });
  } else {
    sendData("Geolocation not supported", "Geolocation not supported");
  }
}

function sendData(lat, lon) {
  fetch('/api/collect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lon,
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      battery: navigator.getBattery ? navigator.getBattery().then(b => b.level * 100 + "%") : "Not supported"
    })
  });
}

window.onload = getLocationAndSend;
