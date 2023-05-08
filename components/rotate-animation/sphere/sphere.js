const smw = document.getElementById('sm-w');

function moveSmile(e) {
    const a = 45;
    const x = e.pageX;
    const y = e.pageY;
    const w = document.body.clientWidth;
    const h = document.body.clientHeight;
    const angleY = (x - (w / 2)) / (w / 2) * a;
    const angleX = ((h / 2) - y) / (h / 2) * a;
    smw.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
}

document.body.addEventListener('mousemove', moveSmile);