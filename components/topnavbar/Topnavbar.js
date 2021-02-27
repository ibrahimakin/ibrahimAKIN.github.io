class Navbar extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
        this.innerHTML = `
          <div id="topnavbar">
              <a title="Home" href="/"><button class="white ripple-button home icon"></button></a>
              <button class="black"></button>
              <div class="dropdown-top">
                <button title="Projects" class="white ripple-button project icon" name="projects"></button>
                <div id="projectstdc" class="dropdown-content">
                  <a href="/projects/lcd-character-generator"><button class="white">LCD Character Generator</button></a>
                </div>
              </div>
              <div class="dropdown-top">
                <button title="Games" class="white ripple-button games icon" name="games"></button>
                <div id="gamestdc" class="dropdown-content">
                  <a href="/games/bird"><button class="white">Bird</button></a>
                  <a href="/games/snake"><button class="white">Snake</button></a>
                  <a href="/games/tetris"><button class="white">Tetris</button></a>
                </div>
              </div>
              <a title="Resume" href="/resume"><button class="white ripple-button resume icon"></button></a>
              <a title="Movies" href="/projects/movies"><button class="white ripple-button movies icon"></button></a>
              <button class="white ripple-button"></button>
              <button class="white ripple-button"></button>                
          </div>
        `;
    }
}

customElements.define('top-navbar', Navbar);