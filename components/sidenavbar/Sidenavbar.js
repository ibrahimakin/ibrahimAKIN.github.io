const sidenavOpenWidth = 250;
const sidenavWidth = 83;
const sidenavDelay = 100;
const sidenavMediaWidth = 750;
let isClicked = false;
// let secondClick = false;
// let currentClickedName = '';

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
    handleClick(event) {
      const element = document.getElementById('sidenavbar');      
      if ( parseFloat(element.style.minWidth) >= sidenavOpenWidth ) {
        element.style.transition = `min-width ${sidenavDelay}ms linear, width ${sidenavDelay}ms linear`;
        closeNavbar();
      } else {
        element.style.transition = `min-width ${sidenavDelay}ms linear`;
        openNavbar()
      }
    };
    myFunction(x, onStart) {
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
    
    // handleDropdownClick(event) {
    //   if (currentClickedName.length) {
    //     document.getElementById(currentClickedName + 'dc').style.display = 'none';
    //   }
    //   if (event.target.name) {
    //     currentClickedName = event.target.name;
    //     showDropdownContent(event)
    //     isClicked = true;
    //   }
    // }
    // windowClick(event){
    //   if (isClicked) {
    //     if (event.target.name !== currentClickedName) {
    //       document.getElementById(currentClickedName + 'dc').style.display = 'none';
    //       isClicked = false;
    //     }
    //   }
    // }

    handleDropdownHover(event) {
      if (!isClicked) {
        if (event.target.name) {
          showDropdownContent(event);
        }
      }
    }
    handleDropdownLeave(event) {
      if(!isClicked){
        event.target.children[1].style.display = 'none';
      }
    }
    
    connectedCallback() {
        this.innerHTML = `
          <div id="sidenavbar" class="layout" style="min-width: 250px;">
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
                  <button name="projects" class="white ripple-button project icon dropdown-button" title="Projects"></button>
                  <div id="projectsdc" class="dropdown-content">
                    <a href="/projects/lcd-character-generator"><button class="white">LCD Character Generator</button></a>
                  </div>
                  </div>
                  <div class="dropdown" name="games">
                  <button name="games" class="white ripple-button games icon dropdown-button" title="Games"></button>
                  <div id="gamesdc" class="dropdown-content">
                    <a href="/games/bird"><button class="white">Bird</button></a>
                    <a href="/games/snake"><button class="white">Snake</button></a>
                    <a href="/games/tetris"><button class="white">Tetris</button></a>
                  </div>
                  </div>
                  <a title="Resume" href="/resume"><button class="white ripple-button resume icon"></button></a>
                  <a title="Movies" href="#"><button class="white ripple-button movies icon"></button></a>
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
        particlesJS('particles-jsnav', particlesConfig);

        let x = window.matchMedia(`(max-width: ${sidenavMediaWidth}px)`)
        this.myFunction(x, true)                          // Call listener function at run time
        x.addEventListener('change', this.myFunction)     // Attach listener function on state changes

        let dropdownContainer = document.getElementsByClassName('dropdown');
        for (let dropdown of dropdownContainer) {
          dropdown.addEventListener('mouseover', this.handleDropdownHover);
          dropdown.addEventListener('mouseleave', this.handleDropdownLeave);
        }

        // let dropdownButtons = document.getElementsByClassName('dropdown-button');
        // for (let dropdownButton of dropdownButtons) {
        //   dropdownButton.addEventListener('click', this.handleDropdownClick);
        // }
        // window.addEventListener('click', this.windowClick);
    }
}

customElements.define('side-navbar', Sidenavbar);