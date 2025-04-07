// https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Detecting_device_orientation
const ball = document.querySelector('.ball');
const garden = document.querySelector('.garden');
const output = document.querySelector('.output');

const maxX = garden.clientWidth - ball.clientWidth;
const maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(e) {
    let x = e.beta;     // In degree in the range [-180,180)
    let y = e.gamma;    // In degree in the range [-90,90)

    output.textContent = `beta:  ${x}\n`;
    output.textContent += `gamma: ${y}`;

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x > 90) x = 90;
    if (x < -90) x = -90;

    // To make computation easier we shift the range of
    // x and y to [0,180]
    x += 90;
    y += 90;

    // 10 is half the size of the ball
    // It centers the positioning point to the center of the ball
    ball.style.left = `${(maxY * y) / 180 - 10}px`; // rotating device around the y axis moves the ball horizontally
    ball.style.top = `${(maxX * x) / 180 - 10}px`;  // rotating device around the x axis moves the ball vertically
}

window.addEventListener('deviceorientation', handleOrientation);