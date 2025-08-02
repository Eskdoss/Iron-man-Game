// Image Assets
const ironmanImg = new Image();
ironmanImg.src = './assets/ironman.png';

const enemyImg = new Image();
enemyImg.src = './assets/enemy.png';

const bgImg = new Image();
bgImg.src = './assets/bg.png';

// Game Configuration
const GAME_CONFIG = {
    canvas: {
        width: 1200,
        height: 600
    },
    ironMan: {
        width: 60,
        height: 40,
        speed: 5,
        maxLives: 3
    },
    laser: {
        width: 20,
        height: 4,
        speed: 8,
        color: '#ff6b6b'
    },
    enemy: {
        width: 40,
        height: 40,
        speed: 3,
        spawnRate: 0.02,
        colors: ['#8b0000', '#ff4500', '#dc143c']
    },
    powerUp: {
        width: 25,
        height: 25,
        speed: 2,
        spawnRate: 0.005
    }
};

// Game State
let gameState = {
    isRunning: false,
    isPaused: false,
    score: 0,
    lives: GAME_CONFIG.ironMan.maxLives,
    level: 1,
    enemySpeedMultiplier: 1,
    lastTime: 0
};

// Game Objects
let ironMan = {
    x: 100,
    y: 300,
    width: GAME_CONFIG.ironMan.width,
    height: GAME_CONFIG.ironMan.height,
    speed: GAME_CONFIG.ironMan.speed,
    color: '#ffd93d'
};

let lasers = [];
let enemies = [];
let explosions = [];
let powerUps = [];

// Input Handling
let keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false
};

// DOM Elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const pauseScreen = document.getElementById('pauseScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const finalScoreElement = document.getElementById('finalScore');

// Event Listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

// Key Event Handlers
function handleKeyDown(e) {
    switch(e.code) {
        case 'ArrowUp':
        case 'KeyW':
            keys.up = true;
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 'KeyS':
            keys.down = true;
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = true;
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = true;
            e.preventDefault();
            break;
        case 'Space':
            keys.space = true;
            e.preventDefault();
            break;
        case 'KeyP':
            togglePause();
            e.preventDefault();
            break;
    }
}

function handleKeyUp(e) {
    switch(e.code) {
        case 'ArrowUp':
        case 'KeyW':
            keys.up = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keys.down = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = false;
            break;
        case 'Space':
            keys.space = false;
            break;
    }
}

// Game Functions
function startGame() {
    gameState.isRunning = true;
    gameState.isPaused = false;
    startScreen.classList.add('hidden');
    resetGame();
    gameLoop();
}

function restartGame() {
    gameOverScreen.classList.add('hidden');
    startGame();
}

function resetGame() {
    gameState.score = 0;
    gameState.lives = GAME_CONFIG.ironMan.maxLives;
    gameState.level = 1;
    gameState.enemySpeedMultiplier = 1;
    
    ironMan.x = 100;
    ironMan.y = 300;
    
    lasers = [];
    enemies = [];
    explosions = [];
    powerUps = [];
    
    updateUI();
}

function togglePause() {
    if (!gameState.isRunning) return;
    
    gameState.isPaused = !gameState.isPaused;
    if (gameState.isPaused) {
        pauseScreen.classList.remove('hidden');
    } else {
        pauseScreen.classList.add('hidden');
        gameLoop();
    }
}

function gameOver() {
    gameState.isRunning = false;
    finalScoreElement.textContent = gameState.score;
    gameOverScreen.classList.remove('hidden');
}

function updateUI() {
    scoreElement.textContent = gameState.score;
    livesElement.textContent = gameState.lives;
}

// Game Loop
function gameLoop(currentTime = 0) {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    const deltaTime = currentTime - gameState.lastTime;
    gameState.lastTime = currentTime;
    
    update(deltaTime);
    render();
    
    requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    updateIronMan();
    updateLasers();
    updateEnemies();
    updateExplosions();
    updatePowerUps();
    spawnEnemies();
    spawnPowerUps();
    checkCollisions();
    updateDifficulty();
}

function updateIronMan() {
    // Movement
    if (keys.up && ironMan.y > 0) {
        ironMan.y -= ironMan.speed;
    }
    if (keys.down && ironMan.y < canvas.height - ironMan.height) {
        ironMan.y += ironMan.speed;
    }
    if (keys.left && ironMan.x > 0) {
        ironMan.x -= ironMan.speed;
    }
    if (keys.right && ironMan.x < canvas.width - ironMan.width) {
        ironMan.x += ironMan.speed;
    }
    
    // Shooting
    if (keys.space) {
        shootLaser();
    }
}

let lastLaserTime = 0;
function shootLaser() {
    const currentTime = Date.now();
    if (currentTime - lastLaserTime > 150) { // Rate limiting
        lasers.push({
            x: ironMan.x + ironMan.width,
            y: ironMan.y + ironMan.height / 2,
            width: GAME_CONFIG.laser.width,
            height: GAME_CONFIG.laser.height,
            speed: GAME_CONFIG.laser.speed
        });
        lastLaserTime = currentTime;
    }
}

function updateLasers() {
    for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        laser.x += laser.speed;
        
        // Remove lasers that are off-screen
        if (laser.x > canvas.width) {
            lasers.splice(i, 1);
        }
    }
}

function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.x -= enemy.speed * gameState.enemySpeedMultiplier;
        
        // Remove enemies that are off-screen
        if (enemy.x + enemy.width < 0) {
            enemies.splice(i, 1);
        }
    }
}

function updateExplosions() {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        explosion.timer -= 1;
        
        if (explosion.timer <= 0) {
            explosions.splice(i, 1);
        }
    }
}

function updatePowerUps() {
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        powerUp.x -= GAME_CONFIG.powerUp.speed;
        
        // Remove power-ups that are off-screen
        if (powerUp.x + powerUp.width < 0) {
            powerUps.splice(i, 1);
        }
    }
}

function spawnEnemies() {
    if (Math.random() < GAME_CONFIG.enemy.spawnRate * gameState.level) {
        const enemy = {
            x: canvas.width,
            y: Math.random() * (canvas.height - GAME_CONFIG.enemy.height),
            width: GAME_CONFIG.enemy.width,
            height: GAME_CONFIG.enemy.height,
            speed: GAME_CONFIG.enemy.speed,
            color: GAME_CONFIG.enemy.colors[Math.floor(Math.random() * GAME_CONFIG.enemy.colors.length)]
        };
        enemies.push(enemy);
    }
}

function spawnPowerUps() {
    if (Math.random() < GAME_CONFIG.powerUp.spawnRate) {
        const powerUp = {
            x: canvas.width,
            y: Math.random() * (canvas.height - GAME_CONFIG.powerUp.height),
            width: GAME_CONFIG.powerUp.width,
            height: GAME_CONFIG.powerUp.height,
            type: Math.random() < 0.5 ? 'health' : 'score'
        };
        powerUps.push(powerUp);
    }
}

function checkCollisions() {
    // Laser vs Enemy collisions
    for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            
            if (isColliding(laser, enemy)) {
                // Create explosion
                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                
                // Remove laser and enemy
                lasers.splice(i, 1);
                enemies.splice(j, 1);
                
                // Increase score
                gameState.score += 10;
                updateUI();
                break;
            }
        }
    }
    
    // Iron Man vs Enemy collisions
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (isColliding(ironMan, enemy)) {
            // Create explosion
            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
            
            // Remove enemy
            enemies.splice(i, 1);
            
            // Decrease lives
            gameState.lives--;
            updateUI();
            
            if (gameState.lives <= 0) {
                gameOver();
                return;
            }
        }
    }
    
    // Iron Man vs Power-up collisions
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        if (isColliding(ironMan, powerUp)) {
            // Apply power-up effect
            if (powerUp.type === 'health' && gameState.lives < GAME_CONFIG.ironMan.maxLives) {
                gameState.lives++;
            } else if (powerUp.type === 'score') {
                gameState.score += 50;
            }
            
            // Remove power-up
            powerUps.splice(i, 1);
            updateUI();
        }
    }
}

function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function createExplosion(x, y) {
    explosions.push({
        x: x,
        y: y,
        timer: 20,
        size: 30
    });
}

function updateDifficulty() {
    const newLevel = Math.floor(gameState.score / 100) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        gameState.enemySpeedMultiplier = 1 + (gameState.level - 1) * 0.2;
    }
}

// Rendering Functions
function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    drawBackground();
    
    // Draw game objects
    drawIronMan();
    drawLasers();
    drawEnemies();
    drawExplosions();
    drawPowerUps();
}

function drawBackground() {
    // Draw background image if loaded, otherwise use gradient fallback
    if (bgImg.complete && bgImg.naturalHeight !== 0) {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    } else {
        // Fallback gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(0.3, '#4682b4');
        gradient.addColorStop(1, '#2f4f4f');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw simple city silhouette
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        for (let i = 0; i < 10; i++) {
            const buildingHeight = Math.random() * 100 + 50;
            ctx.fillRect(i * 120, canvas.height - buildingHeight, 100, buildingHeight);
        }
    }
}

function drawIronMan() {
    // Draw Iron Man image if loaded, otherwise use rectangle fallback
    if (ironmanImg.complete && ironmanImg.naturalHeight !== 0) {
        // Add glow effect
        ctx.shadowColor = '#ffd93d';
        ctx.shadowBlur = 10;
        ctx.drawImage(ironmanImg, ironMan.x, ironMan.y, ironMan.width, ironMan.height);
        ctx.shadowBlur = 0;
    } else {
        // Fallback rectangle drawing
        ctx.fillStyle = ironMan.color;
        ctx.fillRect(ironMan.x, ironMan.y, ironMan.width, ironMan.height);
        
        // Add details
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(ironMan.x + 5, ironMan.y + 5, 10, 10); // Arc reactor
        ctx.fillRect(ironMan.x + ironMan.width - 15, ironMan.y + 15, 10, 5); // Thruster
        
        // Add glow effect
        ctx.shadowColor = '#ffd93d';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(255, 217, 61, 0.3)';
        ctx.fillRect(ironMan.x - 2, ironMan.y - 2, ironMan.width + 4, ironMan.height + 4);
        ctx.shadowBlur = 0;
    }
}

function drawLasers() {
    ctx.fillStyle = GAME_CONFIG.laser.color;
    ctx.shadowColor = GAME_CONFIG.laser.color;
    ctx.shadowBlur = 5;
    
    lasers.forEach(laser => {
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
    });
    
    ctx.shadowBlur = 0;
}

function drawEnemies() {
    enemies.forEach(enemy => {
        // Draw enemy image if loaded, otherwise use rectangle fallback
        if (enemyImg.complete && enemyImg.naturalHeight !== 0) {
            ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
        } else {
            // Fallback rectangle drawing
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            
            // Add enemy details
            ctx.fillStyle = '#fff';
            ctx.fillRect(enemy.x + 5, enemy.y + 5, 5, 5); // Eye
            ctx.fillRect(enemy.x + enemy.width - 10, enemy.y + enemy.height / 2, 5, 3); // Weapon
        }
    });
}

function drawExplosions() {
    explosions.forEach(explosion => {
        const alpha = explosion.timer / 20;
        ctx.fillStyle = `rgba(255, 107, 107, ${alpha})`;
        ctx.fillRect(
            explosion.x - explosion.size / 2,
            explosion.y - explosion.size / 2,
            explosion.size,
            explosion.size
        );
        
        ctx.fillStyle = `rgba(255, 217, 61, ${alpha * 0.7})`;
        ctx.fillRect(
            explosion.x - explosion.size / 3,
            explosion.y - explosion.size / 3,
            explosion.size / 1.5,
            explosion.size / 1.5
        );
    });
}

function drawPowerUps() {
    powerUps.forEach(powerUp => {
        if (powerUp.type === 'health') {
            ctx.fillStyle = '#6bcf7f';
        } else {
            ctx.fillStyle = '#ffd93d';
        }
        
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
        
        // Add glow effect
        ctx.shadowColor = powerUp.type === 'health' ? '#6bcf7f' : '#ffd93d';
        ctx.shadowBlur = 8;
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
        ctx.shadowBlur = 0;
    });
}

// Initialize the game
console.log('Life of Iron Man - Game Loaded!');
console.log('Controls: WASD/Arrow Keys to move, Spacebar to shoot, P to pause');
