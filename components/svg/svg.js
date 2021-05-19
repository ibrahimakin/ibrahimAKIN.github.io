function readSVGFile(file, className) {
    let rawFile = new XMLHttpRequest();
    rawFile.open('GET', file);
    rawFile.setRequestHeader("Content-Type", "image/svg+xml");
    rawFile.addEventListener("load", function (event) {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                let allText = rawFile.responseText;
                for (const el of document.getElementsByClassName(className)) {
                    el.style = "height: 120px; width: 120px;";
                    el.innerHTML = allText;
                }
            }
        }
    });
    rawFile.send(null);
}
function refreshSVG() {
    readSVGFile('../../assets/icons/navbar/back.svg', 'back');
    readSVGFile('../../assets/icons/navbar/forward.svg', 'forward');
}
function initSVG() {
    readSVGFile('../../assets/icons/navbar/home-icon-silhouette.svg', 'home');
    readSVGFile('../../assets/icons/navbar/project-solid.svg', 'project');
    readSVGFile('../../assets/icons/navbar/games.svg', 'games');
    readSVGFile('../../assets/icons/navbar/resume-and-cv.svg', 'resume');
    readSVGFile('../../assets/icons/navbar/movies.svg', 'movies');
    readSVGFile('../../assets/icons/navbar/i-icon.svg', 'iicon');
    readSVGFile('../../assets/icons/navbar/bird.svg', 'bird');
    readSVGFile('../../assets/icons/navbar/snake.svg', 'snake');
    readSVGFile('../../assets/icons/navbar/tetris.svg', 'tetris');
    readSVGFile('../../assets/icons/navbar/settings.svg', 'settings');
    readSVGFile('../../assets/icons/navbar/tic-tac-toe.svg', 'tic-tac-toe');
    refreshSVG()
}
initSVG();