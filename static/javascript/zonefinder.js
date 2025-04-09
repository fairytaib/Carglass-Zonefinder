const closestFiliale = document.getElementById('closest-filiale');
const mobileFiliale = document.getElementById('mobile-filiale');
const zoneNumber = document.getElementById('zone-number'); 

let API_KEY, SHEET_ID;

fetch('static/javascript/creds.js')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n');
        lines.forEach(line => {
            if (line.includes('API_KEY')) {
                API_KEY = line.split('=')[1].trim().replace(/['";]/g, '');
            } else if (line.includes('SHEET_ID')) {
                SHEET_ID = line.split('=')[1].trim().replace(/['";]/g, '');
            }
        });
    })
    .catch(error => {
        console.error('Fehler beim Laden der creds.js Datei:', error);
    });

async function getPostalCodeData(postalCode) {
    const range = 'A:E'; 
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.values) {
            const postalCodes = data.values.slice(1).map(row => row[0]);
            let left = 0;
            let right = postalCodes.length - 1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (postalCodes[mid] === postalCode) {
                    return {
                        filiale: data.values[mid +1][1], 
                        mobile: data.values[mid + 1][2],
                        zone: data.values[mid + 1][4]
                    }; 

                } else if (postalCodes[mid] < postalCode) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return null; // Postleitzahl nicht gefunden
    } catch (error) {
        console.error('Postleitzahl in Tabelle nicht gefunden:', error);
        return null;
    }
}

searchButton.addEventListener('click', async () => {
    const postalCode = searchInput.value;
    if (postalCode) {
        const filial = await getPostalCodeData(postalCode);
        if (filial !== null) {
            closestFiliale.textContent = filial.filiale;
            mobileFiliale.textContent = filial.mobile;
            zoneNumber.textContent = filial.zone;
        } else {
            alert('Fehler beim Abrufen der Google Sheets-Daten.');
        }
    }
})