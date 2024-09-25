function readSVGFile(file, className) {
    const rawFile = new XMLHttpRequest();
    rawFile.open('GET', file);
    rawFile.setRequestHeader('Content-Type', 'image/svg+xml');
    rawFile.addEventListener('load', () => {
        if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
            for (const el of document.getElementsByClassName(className)) {
                el.innerHTML = rawFile.responseText;
            }
        }
    });
    rawFile.send(null);
}
function initSVG() {
    const path = '/assets/icons/navigation/';
    readSVGFile(path + 'home-icon-silhouette.svg', 'home-js');
    readSVGFile(path + 'project-solid.svg', 'project-js');
    readSVGFile(path + 'games.svg', 'games-js');
    readSVGFile(path + 'resume-and-cv.svg', 'resume-js');
    readSVGFile(path + 'movies.svg', 'movies-js');
    readSVGFile(path + 'i-icon.svg', 'iicon-js');
    readSVGFile(path + 'bird.svg', 'bird-js');
    readSVGFile(path + 'snake.svg', 'snake-js');
    readSVGFile(path + 'tetris.svg', 'tetris-js');
    readSVGFile(path + 'settings.svg', 'settings-js');
    readSVGFile(path + 'tic-tac-toe.svg', 'tic-tac-toe-js');
    readSVGFile(path + 'back.svg', 'back-js');
    readSVGFile(path + 'forward.svg', 'forward-js');
}
initSVG();