document.addEventListener('DOMContentLoaded', function() {
    const fireButtonSize = document.getElementById('fireButtonSize');
    const fireButtonValue = document.getElementById('fireButtonValue');
    const generateBtn = document.getElementById('generateBtn');
    const resultCard = document.getElementById('resultCard');
    const copyBtn = document.getElementById('copyBtn');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Update fire button size value display
    fireButtonSize.addEventListener('input', function() {
        fireButtonValue.textContent = fireButtonSize.value;
    });

    // Generate sensitivity
    generateBtn.addEventListener('click', function() {
        const ram = parseInt(document.getElementById('ram').value);
        const fireButton = parseInt(fireButtonSize.value);
        const playstyle = document.getElementById('playstyle').value;
        const graphics = document.getElementById('graphics').value;

        // Base sensitivity calculation
        let base = 50;
        if (graphics === 'Smooth') base += 10;
        if (graphics === 'Ultra') base -= 5;

        // Calculate general sensitivity
        let general = base + (ram * 2) - (fireButton / 5);
        
        // Adjust based on playstyle
        if (playstyle === 'Aggressive') {
            general += 15;
        } else if (playstyle === 'Sniper') {
            general -= 10;
        } else if (playstyle === 'One-tap') {
            general += 5;
        } else if (playstyle === 'Spray') {
            general -= 5;
        }

        // Ensure values are within reasonable range
        general = Math.max(10, Math.min(100, general));

        // Calculate other sensitivities
        const redDot = Math.max(10, general - 5);
        const twoX = Math.max(10, general - 10);
        const fourX = Math.max(10, general - 20);
        
        let sniper = 50;
        if (playstyle === 'Sniper') {
            sniper = 60;
        } else if (playstyle === 'Aggressive') {
            sniper = 40;
        }

        let freeLook = 65;
        if (graphics === 'Smooth') {
            freeLook = 75;
        } else if (graphics === 'Ultra') {
            freeLook = 60;
        }

        // Display results
        document.getElementById('general').textContent = Math.round(general);
        document.getElementById('redDot').textContent = Math.round(redDot);
        document.getElementById('twoX').textContent = Math.round(twoX);
        document.getElementById('fourX').textContent = Math.round(fourX);
        document.getElementById('sniper').textContent = sniper;
        document.getElementById('freeLook').textContent = freeLook;

        resultCard.style.display = 'block';
    });

    // Copy sensitivity to clipboard
    copyBtn.addEventListener('click', function() {
        const sensitivityText = `
General: ${document.getElementById('general').textContent}
Red Dot: ${document.getElementById('redDot').textContent}
2x Scope: ${document.getElementById('twoX').textContent}
4x Scope: ${document.getElementById('fourX').textContent}
Sniper Scope: ${document.getElementById('sniper').textContent}
Free Look: ${document.getElementById('freeLook').textContent}
        `;

        navigator.clipboard.writeText(sensitivityText).then(function() {
            alert('Sensitivity settings copied to clipboard!');
        });
    });

    // Save settings to local storage
    saveBtn.addEventListener('click', function() {
        const settings = {
            brand: document.getElementById('brand').value,
            ram: document.getElementById('ram').value,
            processor: document.getElementById('processor').value,
            graphics: document.getElementById('graphics').value,
            playstyle: document.getElementById('playstyle').value,
            fingers: document.getElementById('fingers').value,
            fireButtonSize: fireButtonSize.value
        };

        localStorage.setItem('sensitivitySettings', JSON.stringify(settings));
        alert('Settings saved to local storage!');
    });

    // Reset all inputs
    resetBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all settings?')) {
            document.getElementById('brand').value = 'Samsung';
            document.getElementById('ram').value = '4';
            document.getElementById('processor').value = 'Snapdragon';
            document.getElementById('graphics').value = 'Smooth';
            document.getElementById('playstyle').value = 'Aggressive';
            document.getElementById('fingers').value = '2';
            fireButtonSize.value = 50;
            fireButtonValue.textContent = '50';
            resultCard.style.display = 'none';
        }
    });

    // Load saved settings if available
    const savedSettings = localStorage.getItem('sensitivitySettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('brand').value = settings.brand;
        document.getElementById('ram').value = settings.ram;
        document.getElementById('processor').value = settings.processor;
        document.getElementById('graphics').value = settings.graphics;
        document.getElementById('playstyle').value = settings.playstyle;
        document.getElementById('fingers').value = settings.fingers;
        fireButtonSize.value = settings.fireButtonSize;
        fireButtonValue.textContent = settings.fireButtonSize;
    }
});