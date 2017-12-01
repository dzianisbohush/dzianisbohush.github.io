function reset() {
	document.getElementById('game-over').style.display = 'none';
    isGameOver = false;
    gameTime = 0;
	lastTower = 0;
    score = 0;
    bulletSpeed = 350;
    

    bonusesIncreaseScore = [];
    bonusesIncreaseBulletSpeed = [];
    bonusesKillEnemies = [];

	towers = [];
    enemies = [];
    bullets = [];

    player.pos = [canvas.width / 2, canvas.height / 2];
}
