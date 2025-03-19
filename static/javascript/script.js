const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('location');

const closestLocation = document.getElementById('closest-location');
const secondLocation = document.getElementById('second-location');
const thirdLocation = document.getElementById('third-location');
const mobileLocation = document.getElementById('mobile-location');
const specialLocation = document.getElementById('special-location');
const zone = document.getElementById('zone');

const fixedLocations = [{
        name: 'Aigle',
        lat: 46.31466293334961,
        lon: 6.9387736320495605
    },
    {
        name: 'Biel',
        lat: 47.1582,
        lon: 7.2831
    },
    {
        name: 'Basel',
        lat: 47.5174,
        lon: 7.6941
    },
    {
        name: 'Bern',
        lat: 46.939,
        lon: 7.435
    },
    {
        name: 'Chur',
        lat: 46.8535,
        lon: 9.5309
    },
    {
        name: 'Contone',
        lat: 46.1541,
        lon: 8.9235
    },
    {
        name: 'Freiburg',
        lat: 46.8224,
        lon: 7.1537
    },
    {
        name: 'Genf',
        lat: 46.1795,
        lon: 6.1391
    },
    {
        name: 'Gland',
        lat: 46.4184,
        lon: 6.2696
    },
    {
        name: 'Gossau',
        lat: 47.4208,
        lon: 9.2575
    },
    {
        name: 'Lugano',
        lat: 46.0134,
        lon: 8.9542
    },
    {
        name: "Luzern",
        lat: 47.0833,
        lon: 8.2667
    },
    {
        name: 'Laussene',
        lat: 46.5553,
        lon: 6.5775
    },
    {
        name: 'Lyssach',
        lat: 47.3868,
        lon: 8.4839
    },
    {
        name: 'Neuenbrug',
        lat: 46.9943,
        lon: 6.887
    },
    {
        name: 'Oftringen',
        lat: 47.30915832519531,
        lon: 7.9256086349487305
    },
    {
        name: 'Rothenburg',
        lat: 47.1043,
        lon: 8.2674
    },
    {
        name: 'Spreitenbach',
        lat: 47.4174,
        lon: 8.3667
    },
    {
        name: 'Sion',
        lat: 46.220603942871094,
        lon: 7.355078220367432
    },
    {
        name: 'Thun',
        lat: 46.7908,
        lon: 7.6039
    },
    {
        name: 'Volketswil',
        lat: 47.37799072265625,
        lon: 8.67882251739502
    },
    {
        name: 'Winterthur',
        lat: 47.5075,
        lon: 8.7592
    },
    {
        name: 'Zug',
        lat: 47.4833,
        lon: 12.0667
    },
    {
        name: 'Zuerich Altstetten',
        lat: 47.3868,
        lon: 8.4839
    },
    {
        name: 'Zuerich Kloten',
        lat: 47.4587,
        lon: 8.5821
    },
    {
        name: 'Zuerich Oerlikon',
        lat: 47.3999,
        lon: 8.5474
    },
    {
        name: 'Yverdon',
        lat: 46.79048156738281,
        lon: 6.628849506378174
    },
];

searchButton.addEventListener('click', () => {
    const postalCode = searchInput.value;
    if (postalCode) {
        getCoordinates(postalCode)
            .then(userCoords => {
                if (userCoords) {
                    const nearestLocations = findNearestLocations(userCoords, fixedLocations);
                    displayLocations(nearestLocations);
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
    if (locations.length > 0) {
        closestLocation.textContent = `${locations[0].name}`;
    }
    if (locations.length > 1) {
        secondLocation.textContent = `${locations[1].name}`;
    }
    if (locations.length > 2) {
        thirdLocation.textContent = `${locations[2].name}`;
    }
}