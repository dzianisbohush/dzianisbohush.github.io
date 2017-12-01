// Game state
let player = {
    pos: [0,0],
	sprite: new Sprite('img/hero.png', [0, 0], [58, 58.4], 2, [0, 1, 2, 1]),
	down: new Sprite('img/hero.png', [0, 0], [58, 58.4], 3, [0, 1, 2, 1]),
	up: new Sprite('img/hero.png', [0, 173], [58, 58.4], 3, [0, 1, 2, 1]),
	left: new Sprite('img/hero.png', [0, 58], [58, 58.4], 3, [0, 1, 2, 1]),
	right: new Sprite('img/hero.png', [0, 116.6], [58, 58.4], 3, [0, 1, 2, 1])
};

let towers = [];
let bullets = [];
let enemies = [];
let explosions = [];

let bonusesIncreaseScore = [];
let bonusesIncreaseBulletSpeed = [];
let bonusesKillEnemies = [];

let lastTower = 0;
let gameTime = 0;
let isGameOver;
let terrainPattern;

let score = 0;
let scoreEl = document.getElementById('score');
