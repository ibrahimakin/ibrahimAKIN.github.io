const sidenavOpenWidth = 250;
const sidenavWidth = 83;
const sidenavDelay = 100;
const sidenavMediaWidth = 750;

function closeNavbar() {
  let button = document.getElementById('center-button');
  let element = document.getElementById('sidenavbar');
  let header = document.getElementById('sticky-navbar');
  element.style.minWidth = `${sidenavWidth}px`;
  element.style.width = `${sidenavWidth}px`;
  header.classList.add('sticky-nav');
  button.classList.remove('back');
  button.classList.add('forward');
}
function openNavbar() {
  let button = document.getElementById('center-button');
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
    node.style.height = event.target.getBoundingClientRect().height+'px';
  }
  dropdownContent.style.display = 'inline-block';
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
      let button = document.getElementById('center-button');
      if (x.matches && parseFloat(element.style.minWidth) >= sidenavOpenWidth) { // If media query matches
        if(onStart){ closeNavbar(); }
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
    handleTouchEnd(event) {
      event.preventDefault();
      let dropdownContents = document.getElementsByClassName('dropdown-content');
      for (let dropdown of dropdownContents) {
        dropdown.style.display = 'none';
      }
      showDropdownContent(event);
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
                  <div id="projectsdc" class="dropdown-content">
                    <a href="/projects/lcd-character-generator"><button class="white">LCD Character Generator</button></a>
                  </div>
                </div>
                <div class="dropdown" name="games">
                  <a title="Games" href="/games"><button name="games" class="white ripple-button games icon dropdown-button"></button></a>
                  <div id="gamesdc" class="dropdown-content">
                    <a title="Bird" href="/games/bird"><button class="white bird icon dropdown-button"></button></a>
                    <a title="Snake" href="/games/snake"><button class="white snake icon dropdown-button"></button></a>
                    <a title="Tetris" href="/games/tetris"><button class="white tetris icon dropdown-button"></button></a>
                  </div>
                </div>
                <a title="Resume" href="/resume"><button class="white ripple-button resume icon"></button></a>
                <a title="Movies" href="/projects/movies"><button class="white ripple-button movies icon"></button></a>
                <div><button class="white ripple-button"></button></div>
                <div><button class="white ripple-button back icon" id="center-button"></button></div>
              </div>
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
            </div>
          </div>
        `;
        let button = document.getElementById('center-button');
        button.addEventListener('click', this.handleClick);

        let x = window.matchMedia(`(max-width: ${sidenavMediaWidth}px)`);
        this.handleMediaQuery(x, true);                          // Call listener function at run time
        x.addEventListener('change', this.handleMediaQuery);     // Attach listener function on state changes

        let dropdownContainer = document.getElementsByClassName('dropdown');
        for (let dropdown of dropdownContainer) {
          dropdown.children[0].addEventListener('touchend', this.handleTouchEnd);
          dropdown.addEventListener('mouseover', this.handleDropdownHover);
          dropdown.addEventListener('mouseleave', this.handleDropdownLeave);
        }
        particlesJS('particles-jsnav', particlesConfig);
    }
}

customElements.define('side-navbar', Sidenavbar);