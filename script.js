let score = 0;
let passivePointsPerSecond = 0;
let clickValue = 1;

function formatNumber(num) {
    if (num < 1000) return num.toString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
    return (num / 1000000000000).toFixed(1) + 'T';
}

function displayClickValue(event) {
    increaseScoreByClick();
    const x = event.clientX;
    const y = event.clientY;
    const clickValueElement = document.createElement('div');
    clickValueElement.classList.add('click-value');
    clickValueElement.textContent = `+${clickValue}`;
    document.body.appendChild(clickValueElement);
    clickValueElement.style.left = `${x}px`;
    clickValueElement.style.top = `${y}px`;
    requestAnimationFrame(() => {
        clickValueElement.style.opacity = 1;
        clickValueElement.style.transform = 'translateY(-50px)';
    });
    setTimeout(() => {
        clickValueElement.remove();
    }, 800);
}

function increaseScoreByClick() {
    score += clickValue;
    updateUI();
    saveGame();
}

function buyAutoGenerator(event) {
    event.stopPropagation();
    if (score >= 100) {
        score -= 100;
        passivePointsPerSecond += 1;
        updateUI();
        saveGame();
    }
}

function buyClickUpgrade(event) {
    event.stopPropagation();
    if (score >= 50) {
        score -= 50;
        clickValue += 1;
        updateUI();
        saveGame();
    }
}

function updateUI() {
    document.getElementById('score-display').innerText = `Score: ${formatNumber(score)}`;
    document.getElementById('auto-score-display').innerText = `Passive Points/Sec: ${passivePointsPerSecond}`;
    document.getElementById('click-power-display').innerText = `Score Per Click: ${clickValue}`;
    document.getElementById('auto-generator').disabled = score < 100;
    document.getElementById('click-upgrade').disabled = score < 50;
}

function startAutoGeneration() {
    setInterval(() => {
        score += passivePointsPerSecond;
        updateUI();
        saveGame();
    }, 1000);
}

function saveGame() {
    const gameData = { score, passivePointsPerSecond, clickValue };
    localStorage.setItem('particleClickerGame', JSON.stringify(gameData));
}

function loadGame() {
    const savedGame = localStorage.getItem('particleClickerGame');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        score = gameData.score;
        passivePointsPerSecond = gameData.passivePointsPerSecond;
        clickValue = gameData.clickValue;
        updateUI();
    }
}

function startResearch(techName, cost) {
    if (score >= cost) {
        score -= cost;
        console.log(`Researching ${techName}...`);
        switch (techName) {
            case "Improved Click Power":
                clickValue *= 2; // Example: Double the click value
                break;
            case "Advanced Auto-Generator":
                passivePointsPerSecond += 5; // Example: Increase passive points per second
                break;
            case "Particle Accelerator":
                clickValue += 5; // Example: Increase click value
                break;
            case "Quantum Entanglement":
                passivePointsPerSecond += 10; // Example: Increase passive points per second
                break;
            case "Nanotechnology":
                passivePointsPerSecond += 20; // Example: Increase passive points per second
                break;
            case "Fusion Reactor":
                clickValue += 10; // Example: Increase click value
                break;
            case "Temporal Distortion":
                passivePointsPerSecond += 50; // Example: Increase passive points per second
                break;
            case "Dark Matter Manipulation":
                clickValue += 20; // Example: Increase click value
                break;
            case "Antimatter Annihilation":
                passivePointsPerSecond += 100; // Example: Increase passive points per second
                break;
            case "Quantum Computing":
                clickValue += 50; // Example: Increase click value
                break;
            case "Interdimensional Rift":
                passivePointsPerSecond += 200; // Example: Increase passive points per second
                break;
            default:
                break;
        }
        updateUI();
        saveGame();
    } else {
        alert("Insufficient score to start research.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadGame();
    updateUI();
    startAutoGeneration();
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.5, anim: { enable: false } },
            size: { value: 3, random: true, anim: { enable: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });
});
