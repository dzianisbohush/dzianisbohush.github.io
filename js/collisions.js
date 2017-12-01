
function collides(x, y, r, b, x2, y2, r2, b2) {
	return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
	return collides(pos[0], pos[1],
		pos[0] + size[0], pos[1] + size[1],
		pos2[0], pos2[1],
		pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
	checkPlayerBounds();
	detectColisionsEnemiesWithBulletsAndPlayer();
	detectColisionsBonusesKillEnemies();
	detectColisionsBonusesIncreaseScore();
	detectColisionsBonusesIncreaseBulletSpeed();
}

function addScore(count) {
	score += count;
}

function detectColisionsEnemiesWithBulletsAndPlayer() {
	// collisions detection for enemies and bullets
	for (let i = 0; i < enemies.length; i++) {
		let pos = enemies[i].pos;
		let size = enemies[i].sprite.size;

		for (let j = 0; j < bullets.length; j++) {
			let pos2 = bullets[j].pos;
			let size2 = bullets[j].sprite.size;

			if (boxCollides(pos, size, pos2, size2)) {
				// Remove the enemy
				enemies.splice(i, 1);
				i--;

				addScore(200);

				// Add blood
				explosions.push({
					pos: pos,
					sprite: new Sprite('img/ufo.png', [30, 196], [73, 59],
						15, [0, 1, 2, 3, 4, 5,6,7],
						null,
						true)
				});

				// Remove the bullet
				bullets.splice(j, 1);
				break;
			}
		}

		if (boxCollides(pos, size, player.pos, player.sprite.size)) {
			gameOver();
		}
	}
}


function detectColisionsBonusesIncreaseScore() {
	for (let i = 0; i < bonusesIncreaseScore.length; i++) {
		let pos = bonusesIncreaseScore[i].pos;
		let size = bonusesIncreaseScore[i].sprite.size;

		if (boxCollides(pos, size, player.pos, player.sprite.size)) {
			// Remove the bonus
			bonusesIncreaseScore.splice(i, 1);
			i--;
			addScore(10000)
		}
	}
}

function detectColisionsBonusesIncreaseBulletSpeed() {
	for (let i = 0; i < bonusesIncreaseBulletSpeed.length; i++) {
		let pos = bonusesIncreaseBulletSpeed[i].pos;
		let size = bonusesIncreaseBulletSpeed[i].sprite.size;

		if (boxCollides(pos, size, player.pos, player.sprite.size)) {
			// Remove the bonus
			bonusesIncreaseBulletSpeed.splice(i, 1);
			i--;

            bulletSpeed += 100;
			addScore(1000)
		}
	}
}

function detectColisionsBonusesKillEnemies() {
	for (let i = 0; i < bonusesKillEnemies.length; i++) {
		let pos = bonusesKillEnemies[i].pos;
		let size = bonusesKillEnemies[i].sprite.size;

		if (boxCollides(pos, size, player.pos, player.sprite.size)) {
			// Remove the bonus
			bonusesKillEnemies.splice(i, 1);
			i--;
			//kill all enemies
			for (let i = 0; i < enemies.length; i++) {
				let pos = enemies[i].pos;
				let size = enemies[i].sprite.size;

				// Add an explosion
				explosions.push({
					pos: pos,
					sprite: new Sprite('img/ufo.png', [30, 196], [73, 59],
                    15, [0, 1, 2, 3, 4, 5,6,7],
						null,
						true)
				});
			}
			enemies.length = 0;
			addScore(5000);
		}
	}
}


function checkPlayerBounds() {
	if (player.pos[0] < 0) {
		player.pos[0] = 0;
	} else if (player.pos[0] > canvas.width - player.sprite.size[0]) {
		player.pos[0] = canvas.width - player.sprite.size[0];
	}

	if (player.pos[1] < 0) {
		player.pos[1] = 0;
	} else if (player.pos[1] > canvas.height - player.sprite.size[1]) {
		player.pos[1] = canvas.height - player.sprite.size[1];
	}
}
