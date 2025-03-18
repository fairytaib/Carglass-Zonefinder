const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('location');

let locations = {};

fetch("static/json/plz.json")
    .then(response => response.json())
    .then(data => {
        locations = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

function getLocations() {
    let searchValue = searchInput.value;

    if (locations.hasOwnProperty(searchValue)) {
        let result = locations[searchValue];

        document.getElementById('closest-location').innerHTML = result.firstLocation;
        document.getElementById('second-location').innerHTML = result.secondLocation;
        document.getElementById('third-location').innerHTML = result.thirdLocation;
        document.getElementById('mobile-location').innerHTML = result.mobileLocation;
    } else {
        document.getElementById('result').innerHTML = "Kein Ort gefunden";
    }
}


searchButton.addEventListener('click', getLocations);