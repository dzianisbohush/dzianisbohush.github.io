
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 700;
document.body.appendChild(canvas);





// The main game loop
let lastTime;
function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
}

function init() {
    terrainPattern = ctx.createPattern(resources.get('img/terrain.png'), 'repeat');

	document.getElementById('play-again').addEventListener('click', reset);
	
    reset();
    lastTime = Date.now();
    main();
}

resources.load([
    'img/tower.png',
 	'img/ufo.png',
    'img/hero.png',
	'img/bullet.png',
    'img/terrain.png',
    'img/bonus-increase-bullet-speed.png',
    'img/bonus-increase-score.png',
    'img/bonus-kill-enemies.png', 
]);
resources.onReady(init);
