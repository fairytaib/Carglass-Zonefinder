const title = document.getElementById('title');
const underTitle = document.getElementById('under-title');

const searchInput = document.getElementById('location');
const searchButton = document.getElementById('search-button');

const h3_title = document.getElementById('h3-title');

const closestLocation = document.getElementById('closest-location');
const secondLocation = document.getElementById('second-location');
const thirdLocation = document.getElementById('third-location');

const footerText = document.getElementById('footer-text');

const french_button = document.getElementById('french-language-button');
const italian_button = document.getElementById('italian-language-button');
const german_button = document.getElementById('german-language-button');

const fixedLocations = [{
        name: 'Aigle 35',
        lat: 46.31466293334961,
        lon: 6.9387736320495605,
        adress: "Chemin des Artisans 11, 1860 Aigle"
    },
    {
        name: 'Biel/Boujean/Bienne 36',
        lat: 47.1582,
        lon: 7.2831,
        adress: "Zürichstrasse 24C, 2504 Biel"
    },
    {
        name: 'Basel/Pratteln/Bale/Basilea 22',
        lat: 47.5174,
        lon: 7.6941,
        adress: "Rührbergweg 7, 4133 Pratteln"
    },
    {
        name: 'Bern/Berne/Berna 23',
        lat: 46.939,
        lon: 7.435,
        adress: "Eigerstrasse 82, 3007 Bern"
    },
    {
        name: 'Chur/Coire 26',
        lat: 46.8535,
        lon: 9.5309,
        adress: "Comercialstrasse 24, 7000 Chur"
    },
    {
        name: 'Contone 43',
        lat: 46.1541,
        lon: 8.9235,
        adress: "Strada Cantonale 29, 6594 Contone"
    },
    {
        name: 'Freiburg/Fribourg 15',
        lat: 46.8224,
        lon: 7.1537,
        adress: "Route d'Englisberg 15a, 1763 Granges-Paccot"
    },
    {
        name: 'Genf/Genéve/Ginera 11',
        lat: 46.1795,
        lon: 6.1391,
        adress: "Route des Acacias 18, 1227 Genève"
    },
    {
        name: 'Gland 16',
        lat: 46.4184,
        lon: 6.2696,
        adress: "Avenue du Mont-Blanc, 32, 1196 Gland"
    },
    {
        name: 'Gossau 25',
        lat: 47.4208,
        lon: 9.2575,
        adress: "Wilerstrasse 82, 9200 Gossau SG"
    },
    {
        name: 'Lugano 42',
        lat: 46.0134,
        lon: 8.9542,
        adress: "Via Trevano 7A, 6900 Lugano"
    },
    {
        name: "Rothenburg/Lucerne/Lucerna 24",
        lat: 47.091644287109375,
        lon: 8.252986907958984,
        adress: "Stationsstrasse 92 in 6023 Rothenburg"
    },
    {
        name: 'Lausanne/Losanna 12',
        lat: 46.5553,
        lon: 6.5775,
        adress: "Chemin de Saugy 7, 1023 Crissier"
    },
    {
        name: 'Lyssach 39',
        lat: 47.3868,
        lon: 8.4839,
        adress: "Bernstrasse 3-5, 8048 Zürich"
    },
    {
        name: 'Neuenbrug/Neuchâtel 14',
        lat: 46.9943,
        lon: 6.887,
        adress: "Rue de Tombet 29, 2034 Peseux"
    },
    {
        name: 'Oftringen 27',
        lat: 47.30915832519531,
        lon: 7.9256086349487305,
        adress: "Luzernerstrasse 52, 4665 Oftringen"
    },
    {
        name: 'Spreitenbach 29',
        lat: 47.4174,
        lon: 8.3667,
        adress: "Hochhaus 13, 8957 Spreitenbach"
    },
    {
        name: 'Sion/Valais 13',
        lat: 46.220603942871094,
        lon: 7.355078220367432,
        adress: "Route de la Drague 16, 1950 Sion"
    },
    {
        name: 'Thun/Thoune (Heimberg) 56',
        lat: 46.7908,
        lon: 7.6039,
        adress: "Blümlisalpstrasse 61, 3627 Heimberg"
    },
    {
        name: 'Volketswil 21',
        lat: 47.37799072265625,
        lon: 8.67882251739502,
        adress: "Hölzliwisenstrasse 11, 8604 Volketswil"
    },
    {
        name: 'Winterthur 45',
        lat: 47.5075,
        lon: 8.7592,
        adress: "St. Gallerstrasse 108, 8404 Winterthur"
    },
    {
        name: 'Zug/Zoug 20',
        lat: 47.4833,
        lon: 12.0667,
        adress: "Chamerstrasse 172, 6300 Zug"
    },
    {
        name: 'Zuerich Altstetten 28',
        lat: 47.3868,
        lon: 8.4839,
        adress: "Flurstrasse 32, 8048 Zürich"
    },
    {
        name: 'Zuerich Kloten 44',
        lat: 47.4587,
        lon: 8.5821,
        adress: "Industriestrasse 18, 8302 Kloten"
    },
    {
        name: 'Zuerich Oerlikon 30',
        lat: 47.3999,
        lon: 8.5474,
        adress: "Wehntalerstrasse 121, 8057 Zürich"
    },
    {
        name: 'Yverdon 34',
        lat: 46.79048156738281,
        lon: 6.628849506378174,
        adress: "Avenue de Grandson 43, 1400 Yverdon-les-Bains"
    },
];

searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

searchButton.addEventListener('click', () => {
    const postalCode = searchInput.value;
    if (postalCode) {
        getCoordinates(postalCode)
            .then(userCoords => {
                if (userCoords) {
                    const nearestLocations = findNearestLocations(userCoords, fixedLocations);
                    displayLocations(nearestLocations);
                } else if (postalCode == "Norbert" || postalCode == "norbert") {
                    searchInput.value = "BAM! FLIEGENKLATSCHE!";
                    searchButton.style.backgroundColor = "red";
                    searchInput.style.backgroundColor = "red";
                } else {
                    alert('Postleitzahl nicht gefunden.');
                }
            })
            .catch(error => {
                console.error('Fehler bei der Geokodierung:', error);
                alert('Ein Fehler ist aufgetreten.');
            });
    } else {
        alert('Bitte geben Sie eine Postleitzahl ein.');
    }
});

async function getCoordinates(postalCode) {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=ch&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        }
        return null;
    } catch (error) {
        throw error;
    }
}

function findNearestLocations(userCoords, locations) {
    const distances = locations.map(location => {
        const distance = calculateDistance(userCoords.lat, userCoords.lon, location.lat, location.lon);
        return {
            ...location,
            distance
        };
    });

    distances.sort((a, b) => a.distance - b.distance);

    return distances;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius der Erde in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Entfernung in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function displayLocations(locations) {
    document.getElementById("current-postalcode").textContent = `PLZ: ${searchInput.value}`
    searchInput.value = "";
    if (locations.length > 0) {
        closestLocation.textContent = `${locations[0].name}`;
        document.getElementById("closest-location-adress").textContent = locations[0].adress;
    }
    if (locations.length > 1) {
        secondLocation.textContent = `${locations[1].name}`;
        document.getElementById("second-location-adress").textContent = locations[1].adress;
    }
    if (locations.length > 2) {
        thirdLocation.textContent = `${locations[2].name}`;
        document.getElementById("third-location-adress").textContent = locations[2].adress;
    }
}

function change_language_french() {
    fetch("./static/json/language.json")
        .then(response => response.json())
        .then(data => {
            title.innerText = data.french.title
            underTitle.innerText = data.french.subtitle
            searchInput.placeholder = data.french.location
            searchButton.innerText = data.french.search
            h3_title.innerText = data.french.h3_title
            footerText.innerText = data.french.footer_text
        })
}

function change_language_italian() {
    fetch("./static/json/language.json")
        .then(response => response.json())
        .then(data => {
            title.innerText = data.italia.title
            underTitle.innerText = data.italia.subtitle
            searchInput.placeholder = data.italia.location
            searchButton.innerText = data.italia.search
            h3_title.innerText = data.italia.h3_title
            footerText.innerText = data.italia.footer_text
        })
}

french_button.addEventListener('click', change_language_french);
italian_button.addEventListener('click', change_language_italian);
german_button.addEventListener('click', () => {
    location.reload();
});