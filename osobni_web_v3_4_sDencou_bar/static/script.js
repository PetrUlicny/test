function copyEmail(emailAddress, btn) {
    // Moderní API pro kopírování do schránky
    navigator.clipboard.writeText(emailAddress).then(() => {
        
        // Změna textu pro zpětnou vazbu
        btn.innerText = "Zkopírováno! ✔";
        btn.classList.add("bg-neon", "text-white"); 

        // Vrácení do původního stavu po 700 ms
        setTimeout(() => {
            btn.innerText = emailAddress; // Vrátí na tlačítko konkrétní e-mail
            btn.classList.remove("bg-neon", "text-white");
        }, 700);
        
    }).catch(err => {
        console.error('Nepodařilo se zkopírovat text: ', err);
        alert("Kopírování se nezdařilo. Zkuste to prosím ručně.");
    });
}


/* --- WEBY -> NAČÍTÁNÍ ČÍSEL ---  */

document.addEventListener("DOMContentLoaded", () => {
    const statNumbers = document.querySelectorAll(".stat-number");

    if (statNumbers.length >= 3) {
        const energyCounter = statNumbers[2];
        const duration = 2000;

        // Uložíme si původní text ("1000")
        const originalText = energyCounter.innerText;
        const target = parseInt(originalText);
        const suffix = originalText.replace(/[0-9]/g, '');

        // Vynulujeme na začátku
        energyCounter.innerText = "0" + suffix;

        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;

            // Vypočítáme postup animace
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Pro plynulejší zpomalení na konci použijeme tzv. ease-out efekt
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            energyCounter.innerText = Math.floor(easeOutProgress * target) + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                energyCounter.innerText = originalText;
            }
        };
        // Spuštění animace
        window.requestAnimationFrame(step);
    }
});

function switchTab(tabName) {
    const tutoringSection = document.getElementById('tutoring-section');
    const webSection = document.getElementById('web-section');
    const btnTutoring = document.getElementById('btn-tutoring');
    const btnWeb = document.getElementById('btn-web');
    const toggleContainer = document.getElementById('mobile-toggle-container'); // Chytíme obal

    tutoringSection.classList.remove('active-tab');
    webSection.classList.remove('active-tab');
    btnTutoring.classList.remove('active');
    btnWeb.classList.remove('active');

    if (tabName === 'tutoring') {
        tutoringSection.classList.add('active-tab');
        btnTutoring.classList.add('active');
        toggleContainer.classList.remove('web-active'); // Jezdec skočí doleva
    } else {
        webSection.classList.add('active-tab');
        btnWeb.classList.add('active');
        toggleContainer.classList.add('web-active'); // Jezdec přepluje doprava
    }
}
