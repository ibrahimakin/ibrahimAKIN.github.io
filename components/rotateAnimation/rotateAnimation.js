const upButton = document.getElementById('up-button');
const leftButton = document.getElementById('left-button');
const centerButton = document.getElementById('center-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const container = document.getElementById('drag-n-rotate');
const sqc = document.getElementById('sq-c');
let currentXDeg = -15;
let currentYDeg = 46;
let currentZDeg = 0;
const setRotation = () => {
    if (currentXDeg >= 360 || currentXDeg <= -360) { currentXDeg = 0; }
    if (currentYDeg >= 360 || currentYDeg <= -360) { currentYDeg = 0; }
    if (currentZDeg >= 360 || currentZDeg <= -360) { currentZDeg = 0; }
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
    currentXDeg = 0; currentYDeg = 0; currentZDeg = 0;
    setRotationWithAnim();
})

let pos = { top: 0, left: 0, x: 0, y: 0 };
const mouseDownHandler = (e) => {
    sqc.style.transition = 'none';
    pos = {
        // The current scroll 
        left: currentYDeg,
        top: currentXDeg,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY
    };
    container.style.userSelect = 'none';
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = (e) => {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    currentXDeg = pos.top - dy;
    currentYDeg = pos.left + dx;
    setRotation();
};

const mouseUpHandler = () => {
    container.style.removeProperty('user-select');
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

container.addEventListener('mousedown', mouseDownHandler);

const touchDownHandler = (e) => {
    sqc.style.transition = 'none';
    pos = {
        // The current scroll 
        left: currentYDeg,
        top: currentXDeg,
        // Get the current mouse position
        x: Math.floor(e.touches[0].pageX),
        y: Math.floor(e.touches[0].pageY)
    };
    container.style.userSelect = 'none';
    document.addEventListener('touchmove', touchMoveHandler);
    document.addEventListener('touchend', touchUpHandler);
};

const touchMoveHandler = (e) => {
    // How far the mouse has been moved
    const dx = Math.floor(e.touches[0].pageX) - pos.x;
    const dy = Math.floor(e.touches[0].pageY) - pos.y;
    currentXDeg = pos.top - dy;
    currentYDeg = pos.left + dx;
    setRotation();
};

const touchUpHandler = () => {
    container.style.removeProperty('user-select');
    document.removeEventListener('touchmove', touchMoveHandler);
    document.removeEventListener('touchend', touchUpHandler);
};

container.addEventListener('touchstart', touchDownHandler);