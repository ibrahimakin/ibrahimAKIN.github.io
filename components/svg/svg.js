function readSVGFile(file, className) {
    let rawFile = new XMLHttpRequest();
    rawFile.open('GET', file);
    rawFile.setRequestHeader('Content-Type', 'image/svg+xml');
    rawFile.addEventListener('load', () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                let allText = rawFile.responseText;
                for (const el of document.getElementsByClassName(className)) {
                    el.innerHTML = allText;
                }
            }
        }
    });
    rawFile.send(null);
}
function initSVG() {
    readSVGFile('/assets/icons/navbar/home-icon-silhouette.svg', 'home-js');
    readSVGFile('/assets/icons/navbar/project-solid.svg', 'project-js');
    readSVGFile('/assets/icons/navbar/games.svg', 'games-js');
    readSVGFile('/assets/icons/navbar/resume-and-cv.svg', 'resume-js');
    readSVGFile('/assets/icons/navbar/movies.svg', 'movies-js');
    readSVGFile('/assets/icons/navbar/i-icon.svg', 'iicon-js');
    readSVGFile('/assets/icons/navbar/bird.svg', 'bird-js');
    readSVGFile('/assets/icons/navbar/snake.svg', 'snake-js');
    readSVGFile('/assets/icons/navbar/tetris.svg', 'tetris-js');
    readSVGFile('/assets/icons/navbar/settings.svg', 'settings-js');
    readSVGFile('/assets/icons/navbar/tic-tac-toe.svg', 'tic-tac-toe-js');
    readSVGFile('/assets/icons/navbar/back.svg', 'back-js');
    readSVGFile('/assets/icons/navbar/forward.svg', 'forward-js');
}
initSVG();