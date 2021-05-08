const sidenavOpenWidth = 250;
const sidenavWidth = 83;
const sidenavDelay = 100;
const sidenavMediaWidth = 750;

function closeNavbar() {
  let button = document.getElementById('collapse-button');
  let element = document.getElementById('sidenavbar');
  let header = document.getElementById('sticky-navbar');
  element.style.minWidth = `${sidenavWidth}px`;
  element.style.width = `${sidenavWidth}px`;
  header.classList.add('sticky-nav');
  button.classList.remove('back');
  button.classList.add('forward');
}
function openNavbar() {
  let button = document.getElementById('collapse-button');
  let element = document.getElementById('sidenavbar');
  let header = document.getElementById('sticky-navbar');
  element.style.minWidth = `${sidenavOpenWidth}px`;
  button.classList.remove('forward');
  button.classList.add('back');
  setTimeout(() => {
    header.classList.remove('sticky-nav');
  }, (sidenavDelay / 2));
}
function showDropdownContent(event) {
  let dropdownContent = document.getElementById(event.target.name + 'dc');
  dropdownContent.style.left = (event.target.offsetLeft + event.target.offsetWidth - 1) + 'px';
  for (let node of dropdownContent.children) {
    node.style.height = event.target.getBoundingClientRect().height + 'px';
  }
  dropdownContent.style.display = 'inline-block';
}
function hideDropdownContent(event) {
  let dropdownContents = document.getElementsByClassName('sidebarddc');
  for (let dropdown of dropdownContents) {
    dropdown.style.display = 'none';
  }
}
class Sidenavbar extends HTMLElement {
    constructor() {
      super();
    }
    handleClick() {
      const element = document.getElementById('sidenavbar');      
      if ( parseFloat(element.style.minWidth) >= sidenavOpenWidth ) {
        element.style.transition = `min-width ${sidenavDelay}ms linear, width ${sidenavDelay}ms linear`;
        closeNavbar();
      } else {
        element.style.transition = `min-width ${sidenavDelay}ms linear`;
        openNavbar();
      }
    }
    handleMediaQuery(x, onStart) {
      const element = document.getElementById('sidenavbar');
      let button = document.getElementById('collapse-button');
      if (x.matches && parseFloat(element.style.minWidth) >= sidenavOpenWidth) { // If media query matches
        if (onStart) { closeNavbar(); }
        else { button.click(); }
      }
      else if (!x.matches && parseFloat(element.style.minWidth) < sidenavOpenWidth) {
        button.click();
      }
    }
    handleDropdownHover(event) {
      if (event.target.name) {
        showDropdownContent(event);
      }
    }
    handleDropdownLeave(event) {
      event.target.children[1].style.display = 'none';
    }
    handleTouchHover(event) {
      if (event.target.name) {
        event.preventDefault();
        hideDropdownContent();
        showDropdownContent(event);
      }
    }
    handleTouchLeave(event) {
      if (!event.target.classList.contains('dropdown-button')) {
        hideDropdownContent();
      }
    }
    connectedCallback() {
        this.innerHTML = `
          <div id="sidenavbar" style="min-width: ${sidenavOpenWidth}px;">
            <div id="particles-jsnav"></div>
            <div id="grid-container">
              <div class="grid-sub-container">
                <button class="black"></button>
                <button class="black"></button>
                <button class="white ripple-button"></button>
                <button class="black"></button>
                <button class="black"></button>
                <button class="black"></button>
                <button class="black"></button>
                <button class="white ripple-button"></button>
              </div>
              <div class="grid-sub-container" id="sticky-navbar">
                <a title="Home" href="/"><button class="white ripple-button home icon"></button></a>
                <div><button class="black"></button></div>
                <div class="dropdown" name="projects">
                  <a title="Projects" href="/projects"><button name="projects" class="white ripple-button project icon dropdown-button"></button></a>
                  <div id="projectsdc" class="dropdown-content sidebarddc">
                    <a title="Code Playground" href="/projects/code-playground"><button class="white code icon dropdown-button"></button></a>
                    <a title="Face Detector" href="/projects/face-detector"><button class="white face icon dropdown-button"></button></a>
                    <a title="LCD Character Generator" href="/projects/lcd-character-generator"><button class="white iicon icon dropdown-button"></button></a>
                  </div>
                </div>
                <div class="dropdown" name="games">
                  <a title="Games" href="/games"><button name="games" class="white ripple-button games icon dropdown-button"></button></a>
                  <div id="gamesdc" class="dropdown-content sidebarddc">
                    <a title="Tetris" href="/games/tetris"><button class="white tetris icon dropdown-button"></button></a>
                    <a title="Snake" href="/games/snake"><button class="white snake icon dropdown-button"></button></a>
                    <a title="Bird" href="/games/bird"><button class="white bird icon dropdown-button"></button></a>
                    <a title="Tic Tac Toe" href="/games/tic-tac-toe"><button class="white tic-tac-toe icon dropdown-button"></button></a>
                  </div>
                </div>
                <a title="Resume" href="/resume"><button class="white ripple-button resume icon"></button></a>
                <a title="Movies" href="/projects/movies"><button class="white ripple-button movies icon"></button></a>
                <div class="dropdown" name="settings">
                  <button title="Settings" name="settings" class="white ripple-button settings icon dropdown-button"></button>
                  <div id="settingsdc" class="dropdown-content sidebarddc">
                    <button title="Türkçe" lang-name="tr" class="white lang-button dropdown-button lang-option">TR</button>
                    <button title="English" lang-name="en" class="white lang-button dropdown-button lang-option">EN</button>
                  </div>
                </div>
                <div><button class="white ripple-button back icon" id="collapse-button"></button></div>
              </div>
              <div class="grid-sub-container">
                <button tabindex="-1" class="black"></button>
                <button tabindex="-1" class="black"></button>
                <button tabindex="-1" class="white ripple-button"></button>
                <button tabindex="-1" class="black"></button>
                <button tabindex="-1" class="black"></button>
                <button tabindex="-1" class="black"></button>
                <button tabindex="-1" class="black"></button>
                <button tabindex="-1" class="white ripple-button"></button>
              </div>
            </div>
          </div>
        `;
        let button = document.getElementById('collapse-button');
        button.addEventListener('click', this.handleClick);

        let x = window.matchMedia(`(max-width: ${sidenavMediaWidth}px)`);
        this.handleMediaQuery(x, true);                          // Call listener function at run time
        x.addEventListener('change', this.handleMediaQuery);     // Attach listener function on state changes

        let dropdownContainer = document.getElementsByClassName('dropdown');
        for (let dropdown of dropdownContainer) {
          dropdown.addEventListener('touchend', this.handleTouchHover);
          dropdown.addEventListener('mouseover', this.handleDropdownHover);
          dropdown.addEventListener('mouseleave', this.handleDropdownLeave);
        }
        document.addEventListener('touchstart', this.handleTouchLeave);
        try { particlesJS('particles-jsnav', particlesConfig); }
        catch { }
    }
}

customElements.define('side-navbar', Sidenavbar);