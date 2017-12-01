function render() {
    ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!isGameOver) {
        renderEntity(player);
        renderEntities(towers);
        renderEntities(bonusesIncreaseScore);
        renderEntities(bonusesIncreaseBulletSpeed);
        renderEntities(bonusesKillEnemies);   
		renderEntities(enemies);
    }
    
    renderEntities(bullets);    
    renderEntities(explosions);
}

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}
