const upButton = document.getElementById('up-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const container = document.getElementsByClassName('container').item(0);
const ele = document.getElementById('drag-n-drop');
let currentXDeg = 0;
let currentYDeg = 20;
let currentZDeg = 0;
const setRotation = () => {
    if (currentXDeg >= 360 || currentXDeg <= -360) { currentXDeg = 0; }
    if (currentYDeg >= 360 || currentYDeg <= -360) { currentYDeg = 0; }
    if (currentZDeg >= 360 || currentZDeg <= -360) { currentZDeg = 0; }
    container.style.transform = 'rotateX('+ currentXDeg +'deg) rotateY('+ currentYDeg +'deg) rotateZ('+ currentZDeg +'deg)';
}
upButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentXDeg -= 5;
    setRotation();
});
downButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentXDeg += 5;
    setRotation();
});
leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentYDeg += 5;
    setRotation();
});
rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentYDeg -= 5;
    setRotation();
});

let pos = { top: 0, left: 0, x: 0, y: 0 };
const mouseDownHandler = (e) => {
    pos = {
        // The current scroll 
        left: currentYDeg,
        top: currentXDeg,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY
    };
    ele.style.userSelect = 'none';
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
    ele.style.removeProperty('user-select');
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

ele.addEventListener('mousedown', mouseDownHandler);
