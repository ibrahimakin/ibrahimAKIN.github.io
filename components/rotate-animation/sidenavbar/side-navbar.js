class Sidenavbar extends HTMLElement {
  constructor() { super(); }
  handleCollapseChange(e) {
    let sidenav = document.getElementById('main');
    let right = document.getElementById('right');
    sidenav.classList.toggle('open');
    right.classList.toggle('right-open');
    if (e.target.checked) {
      e.target.parentNode.classList.add('back');
      e.target.parentNode.classList.remove('forward');
    }
    else {
      e.target.parentNode.classList.add('forward');
      e.target.parentNode.classList.remove('back');
    }
  }
  handleCollapseExtChange(e) {
    let collapseExts = document.getElementsByClassName('collapse-ext');
    for (const collapseExt of collapseExts) {
      if (collapseExt !== e.target) collapseExt.checked = false;
    }
  }
  connectedCallback() {
    this.innerHTML = `
      <div id="sidenavbar">
        <div class="transform sub">
          <div></div><div></div><div class="white"></div><div></div>
          <div></div><div></div><div></div><div class="white"></div>
        </div>
        <div id="main" class="close">
          <div id="center" class="sub">
            <a title="Home" class="white ripple-button home icon" href="/"></a>
            <div></div>
            <div class="right-ext-cont">
              <a title="Projects" name="projects" class="white ripple-button project icon" href="#"></a>
              <input class="collapse-ext" type="checkbox">
              <div class="right-ext transform sub">
                <div></div><div></div>
                <a title="Code Playground" class="white ripple-button code icon" href="#"></a>
                <a title="Face Detector" class="white ripple-button face icon" href="/projects/face-detector"></a>
                <a title="LCD Character Generator" class="white ripple-button iicon icon" href="/projects/lcd-character-generator"></a>
                <div></div><div></div><div></div>
              </div>
            </div>
            <div class="right-ext-cont">
              <a title="Games" name="games" class="white ripple-button games icon" href="/games"></a>
              <input class="collapse-ext" type="checkbox">
              <div class="right-ext transform sub">
                <div></div><div></div><div></div>
                <a title="Tetris" class="white ripple-button tetris icon" href="/games/tetris"></a>
                <a title="Snake" class="white ripple-button snake icon" href="/games/snake"></a>
                <a title="Bird" class="white ripple-button bird icon" href="/games/bird"></a>
                <a title="Tic Tac Toe" class="white ripple-button tic-tac-toe icon" href="/games/tic-tac-toe"></a>
                <div></div>
              </div>
            </div>
            <a title="Resume" class="white ripple-button resume icon" href="/resume"></a>
            <a title="Movies" class="white ripple-button movies icon" href="/projects/movies"></a>
            <div class="right-ext-cont">
              <button title="Settings" name="settings" class="white ripple-button settings icon"></button>
              <input class="collapse-ext" type="checkbox">
              <div class="right-ext transform sub">
                <div></div><div></div><div></div><div></div><div></div><div></div>
                <button class="white ripple-button">TR</button>
                <button class="white ripple-button">EN</button>
              </div>
            </div>
            <div class="white forward icon"><input id="collapse" type="checkbox"></div>
          </div>
          <div id="right" class="transform sub">
            <div></div><div></div><div class="white"></div><div></div>
            <div></div><div></div><div></div><div class="white"></div>
          </div>
        </div>
      </div>
    `;
    let collapse = document.getElementById('collapse');
    collapse.addEventListener('change', this.handleCollapseChange);
    let collapseExts = document.getElementsByClassName('collapse-ext');
    for (const collapseExt of collapseExts) {
      collapseExt.addEventListener('change', this.handleCollapseExtChange);
    }
  }
}
customElements.define('side-navbar', Sidenavbar);