const mobileFiliale = document.getElementById('mobile-filiale');
const zoneNumber = document.getElementById('zone-number');

let API_KEY, SHEET_ID;

fetch('static/javascript/creds.js')
    .then(response => response.text())
    .then(text => {
        // Parse den Inhalt von creds.js und weise die Variablen zu
        const lines = text.split('\n');
        lines.forEach(line => {
            if (line.includes('API_KEY')) {
                API_KEY = line.split('=')[1].trim().replace(/['";]/g, '');
            } else if (line.includes('SHEET_ID')) {
                SHEET_ID = line.split('=')[1].trim().replace(/['";]/g, '');
            }
        });

        // ... (dein restlicher Code)
    })
    .catch(error => {
        console.error('Fehler beim Laden der creds.js Datei:', error);
    });

        async function getPostalCodeData(postalCode) {
            const range = 'A:E'; // Postleitzahlen in A, Filialen in B
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
        
                if (data.values) {
                    const postalCodes = data.values.slice(1).map(row => row[0]); // Alle Postleitzahlen in ein Array extrahieren
                    let left = 0;
                    let right = postalCodes.length - 1;
        
                    while (left <= right) {
                        const mid = Math.floor((left + right) / 2);
                        if (postalCodes[mid] === postalCode) {
                            console.log(data.values[mid + 1][4]);
                            return {
                                mobile : data.values[mid + 1][2],
                                zone: data.values[mid + 1][4]
                            }; // Filiale gefunden
                            
                        } else if (postalCodes[mid] < postalCode) {
                            left = mid + 1;
                        } else {
                            right = mid - 1;
                        }
                    }
                }
                return null; // Postleitzahl nicht gefunden
            } catch (error) {
                console.error('Fehler beim Abrufen der Google Sheets-Daten:', error);
                return null;
            }
        }

        searchButton.addEventListener('click', async () => {
            const postalCode = searchInput.value;
            if (postalCode) {
                const filial = await getPostalCodeData(postalCode);
                if (filial !== null) {
                    // Zeige die Filialinformation an
                    mobileFiliale.textContent = filial.mobile;
                    zoneNumber.textContent = filial.zone;
            } else {
                alert('Nerv nicht ein.');
            }
            }
        })