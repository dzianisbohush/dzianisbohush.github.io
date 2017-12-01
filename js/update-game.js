// Speed in pixels per second
var playerSpeed = 150;
var bulletSpeed = 350;
var enemySpeed = 50;

function update(dt) {
  gameTime += dt;

  handleInput(dt);
  updateEntities(dt);
  addEnemies();
  addBonuses();
  checkCollisions();

  scoreEl.innerHTML = score;
}

function addEnemies() {
  if (Math.random() < 1 - Math.pow(0.996, gameTime)) {
    switch (getRandomInt(0, 4)) {
      case 0: //left
        enemies.push({
          pos: [0, Math.random() * (canvas.height - 30)],
          sprite: new Sprite(
            "img/ufo.png",
            [115, 89],
            [52, 38.5],
            7,
            [0, 1, 2, 3, 4,5,6,7]
          )
        });
        break;
      case 1: //top
        enemies.push({
          pos: [Math.random() * canvas.width, 0],
          sprite: new Sprite(
            "img/ufo.png",
            [115, 89],
            [52, 38.5],
            7,
            [0, 1, 2, 3, 4,5,6,7]
          )
        });
        break;
      case 2: //bottom
        enemies.push({
          pos: [Math.random() * canvas.width, canvas.height - 30],
          sprite: new Sprite(
            "img/ufo.png",
            [115, 89],
            [52, 38.5],
            7,
            [0, 1, 2, 3, 4,5,6,7]
          )
        });
        break;
      default:
        //right
        enemies.push({
          pos: [canvas.width, Math.random() * (canvas.height - 30)],
          sprite: new Sprite(
            "img/ufo.png",
            [115, 89],
            [52, 38.5],
            7,
            [0, 1, 2, 3, 4,5,6,7]
          )
        });
        break;
    }
  }
}

function addBonuses() {
  //add bonuses
  if (Math.random() < 1 - Math.pow(0.9995, gameTime)) {
    let kindOfBonus = getRandomInt(1, 4);

    switch (kindOfBonus) {
      case 1:
        if (bonusesIncreaseBulletSpeed.length <= 5) {
          bonusesIncreaseBulletSpeed.push({
            pos: [getRandomInt(50, 1150), getRandomInt(50, 650)],
            sprite: new Sprite(
              "img/bonus-increase-bullet-speed.png",
              [0, 0],
              [32, 31],
              6,
              [0, 1, 2, 3, 4, 5, 6, 7]
            )
          });
        }
        break;

      case 2:
        if (bonusesIncreaseScore.length <= 5) {
          bonusesIncreaseScore.push({
            pos: [getRandomInt(50, 1150), getRandomInt(50, 650)],
            sprite: new Sprite(
              "img/bonus-increase-score.png",
              [0, 0],
              [32, 31],
              6,
              [0, 1, 2, 3, 4, 5, 6, 7]
            )
          });
        }
        break;

      case 3:
        if (bonusesKillEnemies.length <= 5) {
          bonusesKillEnemies.push({
            pos: [getRandomInt(50, 1150), getRandomInt(50, 650)],
            sprite: new Sprite(
              "img/bonus-kill-enemies.png",
              [0, 0],
              [32, 31],
              6,
              [0, 1, 2, 3, 4, 5, 6, 7]
            )
          });
        }
        break;
    }
  }
}

function handleInput(dt) {
  if (input.isDown("DOWN") || input.isDown("s")) {
    player.pos[1] += playerSpeed * dt;
    player.sprite = player.down;
  }

  if (input.isDown("UP") || input.isDown("w")) {
    player.pos[1] -= playerSpeed * dt;
    player.sprite = player.up;
  }

  if (input.isDown("LEFT") || input.isDown("a")) {
    player.pos[0] -= playerSpeed * dt;
    player.sprite = player.left;
  }

  if (input.isDown("RIGHT") || input.isDown("d")) {
    player.pos[0] += playerSpeed * dt;
    player.sprite = player.right;
  }

  if (input.isDown("SPACE") && !isGameOver) {
    var isClosest = false;
    for (var i = 0; i < towers.length; i++) {
      if (
        Math.abs(player.pos[0] - towers[i].pos[0]) < 70 &&
        Math.abs(player.pos[1] - towers[i].pos[1]) < 70
      ) {
        isClosest = true;
      }
    }

    if (!isClosest) {
      towers[lastTower % 5] = {
        pos: [player.pos[0], player.pos[1] - 55],
        lastFire: Date.now(),
        sprite: new Sprite("img/tower.png", [31, 0], [48, 118])
      };
      lastTower++;
    }
  }
}

function updateEntities(dt) {
  // Update the player sprite animation
  player.sprite.update(dt);

  //update bonuses animations
  for (var i = 0; i < bonusesIncreaseBulletSpeed.length; i++) {
    bonusesIncreaseBulletSpeed[i].sprite.update(dt);
  }
  for (var i = 0; i < bonusesIncreaseScore.length; i++) {
    bonusesIncreaseScore[i].sprite.update(dt);
  }
  for (var i = 0; i < bonusesKillEnemies.length; i++) {
    bonusesKillEnemies[i].sprite.update(dt);
  }

  // Update the towers sprite animation
  for (var i = 0; i < towers.length; i++) {
    var tower = towers[i];
    tower.sprite.update(dt);

    if (!isGameOver && Date.now() - tower.lastFire > 500) {
      var pi = Math.PI;
      var x = tower.pos[0] + tower.sprite.size[0] / 2;
      var y = tower.pos[1] + tower.sprite.size[1] / 2;

      bullets.push({
        pos: [x, y],
        angle: getRandomArbitrary(-2 * pi, 2 * pi),
        sprite: new Sprite("img/bullet.png", [0, 0], [24, 24])
      });

      tower.lastFire = Date.now();
    }
  }

  // Update all the bullets
  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];

    var pathBulletLenght = dt * bulletSpeed;
    var sin = Math.sin(bullet.angle);
    var cos = Math.cos(bullet.angle);

    bullet.pos[0] += sin * pathBulletLenght;
    bullet.pos[1] += cos * pathBulletLenght;

    // Remove the bullet if it goes offscreen
    if (
      bullet.pos[1] < 0 ||
      bullet.pos[1] > canvas.height ||
      bullet.pos[0] > canvas.width
    ) {
      bullets.splice(i, 1);
      i--;
    }
  }

  // Update all the enemies
  for (var i = 0; i < enemies.length; i++) {
    var x0 = enemies[i].pos[0];
    var y0 = enemies[i].pos[1];
    var x1 = player.pos[0];
    var y1 = player.pos[1];
    var c = enemySpeed * dt;
    var l = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));

    enemies[i].pos[0] += (x1 - x0) * c / l;
    enemies[i].pos[1] += (y1 - y0) * c / l;

    enemies[i].sprite.update(dt);

    // Remove if offscreen
    if (enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
      enemies.splice(i, 1);
      i--;
    }
  }

  // Update all the explosions
  for (var i = 0; i < explosions.length; i++) {
    explosions[i].sprite.update(dt);

    // Remove if animation is done
    if (explosions[i].sprite.done) {
      explosions.splice(i, 1);
      i--;
    }
  }
}
