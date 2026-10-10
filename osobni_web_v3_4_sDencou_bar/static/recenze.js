const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAzfrTd_iVXig2r6gOHw3ZQHAm3NSt4eCL0ZHGivxAa9punbjdsXINY3h8FhE4v9GkqWotm084TfI5/pub?output=csv'; 

document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('all-reviews-grid');

    if (reviewsContainer) {
        Papa.parse(sheetUrl, {
            download: true,
            header: false, 
            skipEmptyLines: true,
            complete: function(results) {
                // Odstranění načítacího nápisu
                const loadingElement = document.getElementById('loading-reviews');
                if (loadingElement) {
                    loadingElement.remove(); 
                }

                const rows = results.data.slice(1); 
                
                rows.forEach(row => {
                    // Máme 8 sloupců. Kontrolujeme sloupec 5 (index 5 - sloupec F), jestli je "Ano"
                    if (row.length >= 8 && row[5] && row[5].trim().toLowerCase() === 'ano') {
                        
                        const name = row[1];      // Sloupec B
                        const subject = row[2];   // Sloupec C
                        const text = row[4];      // Sloupec E
                        const role = row[7];      // Sloupec H
                        
                        // Zpracování hvězdiček ze sloupce D (index 3)
                        const ratingNumber = parseInt(row[3]); 
                        let starsHtml = '';
                        if (!isNaN(ratingNumber)) {
                            starsHtml = '★'.repeat(ratingNumber) + '☆'.repeat(5 - ratingNumber);
                        } else {
                            starsHtml = '★★★★★'; 
                        }

                        const card = document.createElement('div');
                        card.className = 'review-card';
                        
                        // Vykreslení karty se štítkem zaměření a rolí
                        card.innerHTML = `
                            <div class="review-header">
                                <div class="stars">${starsHtml}</div>
                                <span class="subject-tag">${subject}</span>
                            </div>
                            <p class="review-text">"${text}"</p>
                            <div class="reviewer-info">
                                <div class="reviewer-name">${name}</div>
                                <div class="reviewer-role">${role}</div>
                            </div>
                        `;
                        
                        reviewsContainer.appendChild(card);
                    }
                });
            },
            error: function(error) {
                const loadingElement = document.getElementById('loading-reviews');
                if (loadingElement) {
                    loadingElement.textContent = 'Nepodařilo se načíst recenze.';
                    loadingElement.style.color = '#ff4444'; 
                    loadingElement.style.animation = 'none'; 
                }
                console.error('Chyba při načítání recenzí:', error);
            }
        });
    }
});