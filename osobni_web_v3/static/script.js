function copyEmail() {
    // E-mailová adresa, která se má zkopírovat
    const emailAddress = "ulicnybusiness@gmail.com";
    const btn = document.getElementById("emailBtn");

    // Moderní API pro kopírování do schránky
    navigator.clipboard.writeText(emailAddress).then(() => {
        // Uložení původního textu
        const originalText = btn.innerText;

        // Změna textu pro zpětnou vazbu
        btn.innerText = "Zkopírováno! ✔";
        btn.classList.add("bg-neon", "text-white"); // Přidá plnou barvu po kliknutí

        // Vrácení do původního stavu po 2 vteřinách (2000 ms)
        setTimeout(() => {
            btn.innerText = "ulicnybusiness@gmail.com";
            btn.classList.remove("bg-neon", "text-white");
        }, 700);
    }).catch(err => {
        console.error('Nepodařilo se zkopírovat text: ', err);
        alert("Kopírování se nezdařilo. Zkuste to prosím ručně.");
    });
}


/* --- WEBY -> NAČÍTÁNÍ ČÍSEL ---  */

document.addEventListener("DOMContentLoaded", () => {
    // Vybereme všechny prvky s čísly
    const statNumbers = document.querySelectorAll(".stat-number");

    // Ujistíme se, že máme alespoň 3 statistiky, a vezmeme tu třetí (index 2)
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