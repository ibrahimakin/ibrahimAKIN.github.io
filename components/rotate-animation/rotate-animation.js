const upButton = document.getElementById('up-button');
const leftButton = document.getElementById('left-button');
const centerButton = document.getElementById('center-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const container = document.getElementById('drag-n-rotate');
const squares = document.getElementsByClassName('square');
const sqc = document.getElementById('sq-c');
let currentXDeg = -15;
let currentYDeg = 46;
let currentZDeg = 0;
const setRotation = () => {
    currentXDeg %= 360;
    currentYDeg %= 360;
    currentZDeg %= 360;
    sqc.style.transform = 'rotateX('+ currentXDeg +'deg) rotateY('+ currentYDeg +'deg) rotateZ('+ currentZDeg +'deg)';
}
const setRotationWithAnim = () => {
    sqc.style.transition = 'transform .3s linear';
    setRotation();
}
upButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentXDeg += 5;
    setRotationWithAnim();
});
downButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentXDeg -= 5;
    setRotationWithAnim();
});
leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentYDeg -= 5;
    setRotationWithAnim();
});
rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentYDeg += 5;
    setRotationWithAnim();
});
centerButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentXDeg = 1; currentYDeg = 1; currentZDeg = 0;
    setRotationWithAnim();
})

let pos = { top: 0, left: 0, x: 0, y: 0 };
const downHandler = (x, y) => {
    sqc.style.transition = 'none';
    pos = {
        // The current scroll 
        left: currentYDeg,
        top: currentXDeg,
        // Get the current mouse position
        x, y
    };
    container.style.userSelect = 'none';
}
const moveHandler = (x, y) => {
    // How far the mouse has been moved
    const dx = x - pos.x;
    const dy = y - pos.y;
    currentXDeg = pos.top - dy;
    currentYDeg = pos.left + dx;
    setRotation();
}

const mouseDownHandler = (e) => {
    downHandler(e.clientX, e.clientY);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};
const mouseMoveHandler = (e) => {
    moveHandler(e.clientX, e.clientY);
};
const mouseUpHandler = () => {
    container.style.removeProperty('user-select');
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

const touchDownHandler = (e) => {
    downHandler(Math.floor(e.touches[0].pageX), Math.floor(e.touches[0].pageY));
    document.addEventListener('touchmove', touchMoveHandler);
    document.addEventListener('touchend', touchUpHandler);
};
const touchMoveHandler = (e) => {
    moveHandler(Math.floor(e.touches[0].pageX), Math.floor(e.touches[0].pageY));
};
const touchUpHandler = () => {
    container.style.removeProperty('user-select');
    document.removeEventListener('touchmove', touchMoveHandler);
    document.removeEventListener('touchend', touchUpHandler);
};

container.addEventListener('mousedown', mouseDownHandler);
container.addEventListener('touchstart', touchDownHandler);

for (const square of squares) {
    square.addEventListener('mouseover', (e) => {
        for (const square of squares) {
            square.classList.remove('square-hover');
        }
        e.target.classList.add('square-hover');
    });
    square.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('square-hover');
    });
}