class Sidenavbar extends HTMLElement {
  constructor() {
    super();
  }
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
      if (collapseExt !== e.target) { collapseExt.checked = false; }
    }
  }
  connectedCallback() {
    this.innerHTML = `
      <div id="sidenavbar">
        <div class="transform sub">
          <div></div><div></div><div><div class="white"></div></div><div></div>
          <div></div><div></div><div></div><div><div class="white"></div></div>
        </div>
        <div id="main" class="close">
          <div id="center" class="sub">
            <div>
              <a title="Home" href="/"><button class="white ripple-button home icon"></button></a>
            </div><div></div>
            <div class="right-ext-cont">
              <a title="Projects" href="/projects"><button name="projects" class="white ripple-button project icon"></button></a>
              <input class="collapse-ext" type="checkbox">
              <div class="right-ext transform sub">
                <div></div><div></div>
                <div>
                  <a title="Code Playground" href="/projects/code-playground"><button class="white ripple-button code icon"></button></a>
                </div>
                <div>
                  <a title="Face Detector" href="/projects/face-detector"><button class="white ripple-button face icon"></button></a>
                </div>
                <div>
                  <a title="LCD Character Generator" href="/projects/lcd-character-generator"><button class="white ripple-button iicon icon"></button></a>
                </div>
                <div></div><div></div><div></div>
              </div>
            </div>
            <div class="right-ext-cont">
              <a title="Games" href="/games"><button name="games" class="white ripple-button games icon"></button></a>
              <input class="collapse-ext" type="checkbox">
              <div class="right-ext transform sub">
                <div></div><div></div><div></div>
                <div>
                  <a title="Tetris" href="/games/tetris"><button class="white ripple-button tetris icon"></button></a>
                </div>
                <div>
                  <a title="Snake" href="/games/snake"><button class="white ripple-button snake icon"></button></a>
                </div>
                <div>
                  <a title="Bird" href="/games/bird"><button class="white ripple-button bird icon"></button></a>
                </div>
                <div>
                  <a title="Tic Tac Toe" href="/games/tic-tac-toe"><button class="white ripple-button tic-tac-toe icon"></button></a>
                </div>
                <div></div>
              </div>
            </div>
            <div>
              <a title="Resume" href="/resume"><button class="white ripple-button resume icon"></button></a>
            </div>
            <div>
              <a title="Movies" href="/projects/movies"><button class="white ripple-button movies icon"></button></a>
            </div>
            <div class="right-ext-cont">
              <button title="Settings" name="settings" class="white ripple-button settings icon"></button>
              <input class="collapse-ext" type="checkbox">
              <div class="right-ext transform sub">
                <div></div><div></div><div></div><div></div><div></div><div></div>
                <div><button class="white ripple-button">TR</button></div>
                <div><button class="white ripple-button">EN</button></div>
              </div>
            </div>
            <div><div class="white forward icon"><input id="collapse" type="checkbox"></div></div>
          </div>
          <div id="right" class="transform sub">
            <div></div><div></div><div><div class="white"></div></div><div></div>
            <div></div><div></div><div></div><div><div class="white"></div></div>
          </div>
        </div>
      </div>
    `;
    let collapse = document.getElementById('collapse');
    collapse.addEventListener('change', this.handleCollapseChange);
    let collapseExts = document.getElementsByClassName('collapse-ext');
    for (const collapseExt of collapseExts) {
      collapseExt.addEventListener('change', this.handleCollapseExtChange)
    }
  }
}

customElements.define('side-navbar', Sidenavbar);