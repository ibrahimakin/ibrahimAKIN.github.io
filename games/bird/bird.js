const HEIGHT = 500;
const WIDTH = 800
const pipeWidth = 60;
const minPipe = 40;
const space = 120;
const FPS = 120;
let counter = 0;
let highScore = 0;
let isStart = false;

function Bird(ctx) {
	this.ctx = ctx;
	this.x = 150;
	this.y = 150;
	this.bird = new Image();
	this.bird.src = '/assets/images/games/bird/bird.png';
	this.gravity = 0;
	this.velocity = 0.1;
	this.draw = () => {
		this.ctx.drawImage(this.bird, this.x - 20, this.y - 20, 40, 40);
	}
	this.update = () => {
		this.gravity += this.velocity;
		this.gravity = Math.min(4, this.gravity);
		this.y += this.gravity;
	}
	this.jump = () => {
		this.gravity = -4;
	}
}
function Pipe(ctx, height) {
	this.ctx = ctx;
	this.isDead = false;
	this.Score = true;
	this.x = WIDTH;
	this.y = height ? HEIGHT - height : 0;
	this.width = pipeWidth;
	this.height = height || minPipe + Math.random() * (HEIGHT - space - minPipe * 2);
	this.draw = () => {
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	this.update = () => {
		this.x -= 1;
		if (this.x + pipeWidth < 150 && this.Score) {
			counter = counter + 0.5;
			this.Score = false;
			document.getElementById('score').innerHTML = counter;
			if (counter > highScore) {
				document.getElementById('high-score').innerHTML = counter;
				highScore = counter;
				localStorage.setItem('birdHighScore', counter);
			}
		}
		if ((this.x + pipeWidth) < 0) this.isDead = true;
	}
}
window.onload = () => {
	document.getElementById('space-button').onclick = () => onKeyDown({ code: 'Space' });
	document.addEventListener('keydown', onKeyDown);
	highScore = localStorage.getItem('birdHighScore');
	if (highScore) {
		document.getElementById('high-score').innerHTML = highScore;
	}
	let frameCount = 0;
	let c = document.getElementById('canvas');
	c.addEventListener('touchstart', () => onKeyDown({ code: 'Space' }), { passive: false });
	let ctx = c.getContext('2d');
	let pipes = generatePipes();
	let birds = [new Bird(ctx)];
	let loop;
	function startPlay() {
		if (isStart) {
			loop = window.setInterval(gameLoop, 1000 / FPS);
		}
	}
	function onKeyDown(e) {
		if (e.code === 'Space') {
			birds[0].jump();
			if (!isStart) {
				isStart = true;
				startPlay();
			}
		}
	}
	function generatePipes() {
		const firstPipe = new Pipe(ctx, null);
		const secondPipeHeight = HEIGHT - firstPipe.height - space;
		const secondPipe = new Pipe(ctx, secondPipeHeight);
		return [firstPipe, secondPipe];
	}
	function gameLoop() {
		update();
		draw();
	}
	function update() {
		frameCount = frameCount + 1;
		if (frameCount % 320 === 0) {
			pipes.push(...generatePipes());
		}
		pipes.forEach(item => item.update());
		pipes = pipes.filter(pipe => !pipe.isDead);
		birds.forEach(item => item.update());
		if (isGameOver()) {
			isStart = false;
			confirm(lang_obj[getLang()]['game_over']);
			location.reload();
			clearInterval(loop);
		}
	}
	function isGameOver() {
		let gameOver = false;
		birds.forEach(bird => {
			pipes.forEach(pipe => {
				if (bird.y - 10 < 0 || bird.y + 10 > HEIGHT || (
					bird.x + 10 > pipe.x && bird.x - 10 < pipe.x + pipe.width &&
					bird.y + 10 > pipe.y && bird.y - 10 < pipe.y + pipe.height)) {
					gameOver = true;
				}
			});
		});
		return gameOver;
	}
	function draw() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		pipes.forEach(item => item.draw());
		birds.forEach(item => item.draw());
	}
}