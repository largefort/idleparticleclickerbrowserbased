let score = 0;
let passivePointsPerSecond = 0;
let clickValue = 1;
let currentBackgroundImage = ''; // Track current background image

const researchNodes = {
    improvedParticleDetection: { name: 'Improved Particle Detection', cost: 500 },
    enhancedParticleAcceleration: { name: 'Enhanced Particle Acceleration', cost: 1000 },
    advancedQuantumComputing: { name: 'Advanced Quantum Computing', cost: 1500 },
    nanoScaleEngineering: { name: 'Nano-Scale Engineering', cost: 2000 },
    optimizedEnergyTransfer: { name: 'Optimized Energy Transfer', cost: 2500 },
    multiDimensionalAnalysis: { name: 'Multi-Dimensional Analysis', cost: 3000 },
    temporalManipulation: { name: 'Temporal Manipulation', cost: 3500 },
    transcendentalSynthesis: { name: 'Transcendental Synthesis', cost: 4000 },
    galacticExpansion: { name: 'Galactic Expansion', cost: 4500 },
    hyperspaceNavigation: { name: 'Hyperspace Navigation', cost: 5000 }
};

const seasonalEvents = {
    christmas: {
        name: 'Christmas Event',
        startTime: new Date('December 1, 2024 00:00:00 GMT'),
        endTime: new Date('December 31, 2024 23:59:59 GMT'),
        modifier: { clickValue: 2, passivePointsPerSecond: 2 }, // Double points during Christmas
        backgroundImage: 'christmas_background.jpg' // Background image for Christmas event
    },
    easter: {
        name: 'Easter Event',
        startTime: new Date('April 1, 2024 00:00:00 GMT'),
        endTime: new Date('April 7, 2024 23:59:59 GMT'),
        modifier: { clickValue: 3 }, // Triple click value during Easter
        backgroundImage: 'easter_background.jpg' // Background image for Easter event
    },
    // Add more seasonal events here
};

function formatNumber(num) {
    if (num < 1000) return num.toFixed(1);
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
        passivePointsPerSecond += 0.1; // Increase passive points per second by 0.1
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

function openResearchTree() {
    document.getElementById('research-modal').style.display = 'block';
}

function closeResearchTree() {
    document.getElementById('research-modal').style.display = 'none';
}

function startResearch(nodeName, nodeCost) {
    if (score >= nodeCost) {
        score -= nodeCost;
        applyResearchEffect(nodeName);
        console.log(`Researching ${researchNodes[nodeName].name}`);
        updateUI();
        saveGame();
    } else {
        console.log('Insufficient score to start research');
    }
}

function applyResearchEffect(nodeName) {
    // Placeholder research effects
    switch (nodeName) {
        case 'improvedParticleDetection':
            passivePointsPerSecond += 0.2; // Increase passive points per second by 0.2
            break;
        case 'enhancedParticleAcceleration':
            clickValue += 2;
            break;
        case 'advancedQuantumComputing':
            score *= 2;
            break;
        case 'nanoScaleEngineering':
            passivePointsPerSecond += 0.5; // Increase passive points per second by 0.5
            clickValue += 5;
            break;
        case 'optimizedEnergyTransfer':
            passivePointsPerSecond += 1; // Increase passive points per second by 1
            clickValue += 10;
            break;
        case 'multiDimensionalAnalysis':
            passivePointsPerSecond += 2; // Increase passive points per second by 2
            clickValue += 20;
            break;
        case 'temporalManipulation':
            passivePointsPerSecond += 5; // Increase passive points per second by 5
            clickValue += 50;
            break;
        case 'transcendentalSynthesis':
            passivePointsPerSecond += 10; // Increase passive points per second by 10
            clickValue += 100;
            break;
        case 'galacticExpansion':
            passivePointsPerSecond += 20; // Increase passive points per second by 20
            clickValue += 200;
            break;
        case 'hyperspaceNavigation':
            passivePointsPerSecond += 50; // Increase passive points per second by 50
            clickValue += 500;
            break;
        default:
            break;
    }
}

function updateUI() {
    document.getElementById('score-display').innerText = `Score: ${formatNumber(score)}`;
    document.getElementById('auto-score-display').innerText = `Passive Points/Sec: ${formatNumber(passivePointsPerSecond)}`;
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

function applySeasonalEvent() {
    const currentDate = new Date();
    for (const eventName in seasonalEvents) {
        const event = seasonalEvents[eventName];
        if (currentDate >= event.startTime && currentDate <= event.endTime) {
            applyModifier(event.modifier);
            currentBackgroundImage = event.backgroundImage; // Set current background image
            console.log(`Seasonal event "${event.name}" active.`);
            return; // Apply only one event at a time
        }
    }
}

function applyModifier(modifier) {
    clickValue *= modifier.clickValue || 1;
    passivePointsPerSecond *= modifier.passivePointsPerSecond || 1;
}

document.addEventListener('DOMContentLoaded', function() {
    loadGame();
    applySeasonalEvent(); // Apply seasonal event modifiers
    updateUI();
    startAutoGeneration();
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00ff00" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.5, anim: { enable: false } },
            size: { value: 3, random: true, anim: { enable: false } },
            line_linked: { enable: true, distance: 150, color: "#00ff00", opacity: 0.4, width: 1 },
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
        retina_detect: true,
        // Set initial background image based on current seasonal event
        background: {
            color: "#000000",
            image: currentBackgroundImage, // Set initial background image
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover"
        }
    });
});
