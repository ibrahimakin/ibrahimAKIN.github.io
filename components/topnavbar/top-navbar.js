class Navbar extends HTMLElement {
    constructor() {
      super();
    }
    handleTopDropdownHover(event) {
      if (event.target.name) {
        document.getElementById(event.target.name + 'tdc').style.width = event.target.getBoundingClientRect().width + 'px';;
      }
    }
    connectedCallback() {
        this.innerHTML = `
          <div id="topnavbar">
              <a title="Home" href="/"><button class="white ripple-button home icon"></button></a>
              <button class="black"></button>
              <div class="dropdown-top tn-same-width">
                <button title="Projects" class="white ripple-button project icon" name="projects"></button>
                <div id="projectstdc" class="dropdown-content">
                  <a title="English Learner" href="/projects/english-learner"><button class="white smile icon"></button></a>
                  <a title="Code Playground" href="/projects/code-playground"><button class="white code icon"></button></a>
                  <a title="Face Detector" href="/projects/face-detector"><button class="white face icon"></button></a>
                  <a title="LCD Character Generator" href="/projects/lcd-character-generator"><button class="white iicon icon"></button></a>
                </div>
              </div>
              <div class="dropdown-top tn-same-width">
                <button title="Games" class="white ripple-button games icon" name="games"></button>
                <div id="gamestdc" class="dropdown-content">
                  <a title="Tetris" href="/games/tetris"><button class="white tetris icon"></button></a>
                  <a title="Snake" href="/games/snake"><button class="white snake icon"></button></a>
                  <a title="Bird" href="/games/bird"><button class="white bird icon"></button></a>
                  <a title="Tic Tac Toe" href="/games/tic-tac-toe"><button class="white tic-tac-toe icon"></button></a>
                </div>
              </div>
              <a title="Resume" href="/resume"><button class="white ripple-button resume icon"></button></a>
              <a title="Movies" href="/projects/movies"><button class="white ripple-button movies icon"></button></a>
              <div class="dropdown-top tn-same-width">
                <button title="Settings" class="white ripple-button settings icon" name="settings"></button>
                <div id="settingstdc" class="dropdown-content">
                  <button title="Türkçe" lang-name="tr" class="white lang-button lang-option">TR</button>
                  <button title="English" lang-name="en" class="white lang-button lang-option">EN</button>
                </div>
              </div>
              <button class="white ripple-button"></button>                
          </div>
        `;
        let topDropdowns = document.getElementsByClassName('tn-same-width');
        for (const topDropdown of topDropdowns) {
          topDropdown.addEventListener('mouseover', this.handleTopDropdownHover);
        }
    }
}

customElements.define('top-navbar', Navbar);