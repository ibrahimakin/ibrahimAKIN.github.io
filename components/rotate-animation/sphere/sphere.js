let smw = document.getElementById('sm-w');

function moveSmiley(evt) {
    const a = 45;
    const x = evt.offsetX;
    const y = evt.offsetY;
    const w = evt.target.clientWidth;
    const h = evt.target.clientHeight;
    const angleX = (x - (w / 2)) / (w / 2) * a;
    const angleY = ((h / 2) - y) / (h / 2) * a;
    
    smw.style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg)`;
}
function resetMoveSmiley() {
    smw.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

document.body.addEventListener('mousemove', moveSmiley);
// document.body.addEventListener('mouseover', resetMoveSmiley);
// document.body.addEventListener('mouseout', resetMoveSmiley);