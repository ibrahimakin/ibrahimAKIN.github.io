const WIDTH = 800;
const HEIGHT = 500;
const pipeWidth = 60;
const minPipe = 40;
const space = 120;
const FPS = 120;
let counter = 0;
let highScore = 0;

const score = document.getElementById('score');
const high_score = document.getElementById('high-score');
const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

class Bird {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 150;
        this.y = 150;
        this.bird = new Image();
        this.bird.src = '/assets/images/games/bird/bird.png';
        this.gravity = 0;
        this.velocity = 0.1;
    }

    jump = () => this.gravity = -4;

    draw = () => this.ctx.drawImage(this.bird, this.x - 20, this.y - 20, 40, 40);

    update = () => {
        this.gravity += this.velocity;
        this.gravity = Math.min(4, this.gravity);
        this.y += this.gravity;
    }
}

class Pipe {
    constructor(ctx, height) {
        this.ctx = ctx;
        this.isDead = false;
        this.Score = true;
        this.x = WIDTH;
        this.y = height ? HEIGHT - height : 0;
        this.width = pipeWidth;
        this.height = height || minPipe + Math.random() * (HEIGHT - space - minPipe * 2);
    }

    draw = () => {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update = () => {
        this.x -= 1;
        if (this.x + pipeWidth < 150 && this.Score) {
            counter = counter + 0.5;
            this.Score = false;
            score.innerHTML = counter;
            if (counter > highScore) {
                high_score.innerHTML = counter;
                localStorage.setItem('bird_high_score', counter);
                highScore = counter;
            }
        }
        if ((this.x + pipeWidth) < 0) this.isDead = true;
    }
}

window.onload = () => {
    document.addEventListener('keydown', onKeyDown);
    document.getElementById('space-button').onclick = () => onKeyDown({ code: 'Space' });
    c.addEventListener('touchstart', () => onKeyDown({ code: 'Space' }), { passive: false });
    for (const button of document.getElementsByClassName('lang-button')) {
        button.addEventListener('click', () => {
            if (gameOver) {
                draw();
                ctx.fillStyle = '#bd0202';
                ctx.fillText(lang_obj[getLang()]['game_over'], WIDTH / 2, HEIGHT / 2);
            }
        });
    }

    highScore = parseInt(localStorage.getItem('bird_high_score')) || 0;
    if (highScore) high_score.innerHTML = highScore;

    const birds = [new Bird(ctx)];
    let gameOver = false;
    let isStart = true;
    let frameCount = 0;
    let pipes, loop;

    function startPlay() {
        score.innerHTML = 0;
        gameOver = false;
        frameCount = 0;
        counter = 0;
        birds[0].x = 150;
        birds[0].y = 150;
        pipes = generatePipes();
        loop = window.setInterval(gameLoop, 1000 / FPS);
    }

    function onKeyDown(e) {
        if (e.code === 'Space') {
            birds[0].jump();
            if (isStart) {
                isStart = false;
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

    function gameLoop() { update(); draw(); }

    function update() {
        frameCount = frameCount + 1;
        if (frameCount % 320 === 0) pipes.push(...generatePipes());
        pipes.forEach(item => item.update());
        pipes = pipes.filter(pipe => !pipe.isDead);
        birds.forEach(item => item.update());
        if (isGameOver()) {
            clearInterval(loop);
            ctx.textAlign = 'center';
            ctx.font = 'bold 50px serif';
            setTimeout(() => isStart = true, 300);
            setTimeout(() => {
                ctx.fillStyle = '#bd0202';
                ctx.fillText(lang_obj[getLang()]['game_over'], WIDTH / 2, HEIGHT / 2);
            });
        }
    }

    function isGameOver() {
        birds.forEach(bird => {
            pipes.forEach(pipe => {
                if (bird.y - 10 < 0 || bird.y + 10 > HEIGHT || (
                    bird.x + 10 > pipe.x && bird.x - 10 < pipe.x + pipe.width &&
                    bird.y + 10 > pipe.y && bird.y - 10 < pipe.y + pipe.height)) {
                    gameOver = true;
                    return;
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