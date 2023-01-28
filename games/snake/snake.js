class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        document.getElementById('snake-play').addEventListener('click', this.handlePlayClick.bind(this));
        document.getElementById('snake-pause').addEventListener('click', this.handlePauseClick.bind(this));
        document.addEventListener('keydown', this.onKeyPress.bind(this));
        this.best = localStorage.getItem('snakeHighScore');
        if (!this.best) this.best = 0;
    }

    handlePlayClick() {
        if (!this.play) {
            this.onKeyPress({ keyCode: 37 });
            this.play = true;
        }
        this.pause = false;
    }

    handlePauseClick() {
        if (this.play) this.pause = true;
    }

    init() {
        this.positionX = this.positionY = 10;
        this.appleX = this.appleY = 5;
        this.tailSize = 5;
        this.trail = [];
        this.gridSize = /* this.tileCount = */ 20; // canvas 400x400 kare iken tileCount = 20
        this.tileCountX = 40;
        this.tileCountY = 25;
        this.velocityX = this.velocityY = 0;
        this.pause = false;
        this.play = false;
        this.timer = setInterval(this.loop.bind(this), 1000 / 10);
    }

    reset() {
        clearInterval(this.timer);
        this.init();
    }

    loop() {
        if (!this.pause) {
            this.update();
            this.draw();
        }
    }

    update() {
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        if (this.positionX < 0) {
            this.positionX = this.tileCountX - 1;
        }
        if (this.positionY < 0) {
            this.positionY = this.tileCountY - 1;
        }
        if (this.positionX > this.tileCountX - 1) {
            this.positionX = 0;
        }
        if (this.positionY > this.tileCountY - 1) {
            this.positionY = 0;
        }

        this.trail.forEach(t => {
            if (this.positionX === t.positionX && this.positionY === t.positionY) {
                this.reset();
            }
        });

        this.trail.push({ positionX: this.positionX, positionY: this.positionY });

        while (this.trail.length > this.tailSize) {
            this.trail.shift();
        }

        if (this.appleX === this.positionX && this.appleY === this.positionY) {
            this.tailSize++;
            if (this.tailSize - 5 > this.best) {
                this.best = this.tailSize - 5;
                localStorage.setItem('snakeHighScore', this.best);
            }
            this.appleX = Math.floor(Math.random() * this.tileCountX);
            this.appleY = Math.floor(Math.random() * this.tileCountY);
        }
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = 'white';
        this.context.font = '20px Arial';
        let lang = getLang();
        this.context.fillText(lang_obj[lang]['high_score'] + this.best, 20, 30);
        this.context.fillText(lang_obj[lang]['score'] + (this.tailSize - 5), 20, 60);

        this.context.fillStyle = 'yellow';
        this.trail.forEach(t => {
            this.context.fillRect(t.positionX * this.gridSize, t.positionY * this.gridSize, this.gridSize - 5, this.gridSize - 5);
        });

        this.context.fillStyle = 'pink';
        this.context.fillRect(this.appleX * this.gridSize, this.appleY * this.gridSize, this.gridSize - 5, this.gridSize - 5);
    }

    onKeyPress(e) {
        if (this.pause) { return; }
        this.play = true;
        if (e.keyCode === 37 && this.velocityX !== 1) {
            this.velocityX = -1;
            this.velocityY = 0;
        }
        if (e.keyCode === 38 && this.velocityY !== 1) {
            this.velocityX = 0;
            this.velocityY = -1;
        }
        if (e.keyCode === 39 && this.velocityX !== -1) {
            this.velocityX = 1;
            this.velocityY = 0;
        }
        if (e.keyCode === 40 && this.velocityY !== -1) {
            this.velocityX = 0;
            this.velocityY = 1;
        }
    }
}
const game = new SnakeGame();
window.onload = () => game.init();