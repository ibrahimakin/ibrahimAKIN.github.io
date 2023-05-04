class Sidenav extends HTMLElement {
    constructor() { super(); }
    handleCollapseChange() {
        document.getElementById('sidenav').classList.toggle('collapsed');
        document.querySelector('side-nav').classList.toggle('collapsed');
    }
    handleExpandChange(e, pins) {
        for (const pin of pins) if (e.target !== pin) pin.checked = false;
    }
    handleMediaQuery(x) {
        const collapse = document.getElementById('collapse');
        const sidenav = document.getElementById('sidenav');
        const sidenav_cont = document.querySelector('side-nav');
        const collapsed = typeof sidenav_colapsed !== 'undefined';
        if ((collapsed || x.matches) && !collapse.checked) {       // If media query matches
            sidenav_cont.classList.add('collapsed');
            sidenav.classList.add('collapsed');
            collapse.checked = true;
        }
        else if ((!collapsed && !x.matches) && collapse.checked) {
            sidenav_cont.classList.remove('collapsed');
            sidenav.classList.remove('collapsed');
            collapse.checked = false;
        }
    }
    connectedCallback() {
        const lang_support = typeof lang_obj === 'undefined' ? 'disabled' : '';
        this.innerHTML = `
            <div id="sidenav">
                <div class="sub">
                    <div class="grid-3"><div class="filled"></div></div>
                    <div class="grid-8"><div class="filled"></div></div>
                </div>
                <div class="main sub">
                    <div>
                        <a title="Home" class="filled home icon" href="/"></a>
                        <span lang-tag="home">Home</span>
                    </div>
                    <div></div>
                    <div class="menu">
                        <input title="Projects" class="pin-menu" type="checkbox">
                        <div class="filled project icon"></div>
                        <div class="expand">
                            <div>
                                <a title="Language App" class="filled smile-n icon" href="/projects/language-app"></a>
                                <span>Language App</span>
                            </div>
                            <div>
                                <a title="Code Playground" class="filled code icon" href="/projects/code-playground"></a>
                                <span>Code Playground</span>
                            </div>
                            <div>
                                <a title="Face Detector" class="filled face icon" href="/projects/face-detector"></a>
                                <span lang-tag="face_detector">Face Detector</span>
                            </div>
                            <div>
                                <a title="Movies" class="filled movies icon" href="/projects/movies"></a>
                                <span lang-tag="nav_movies">Movies</span>
                            </div>
                            <div>
                                <a title="LCD Character Generator" class="filled iicon icon" href="/projects/lcd-character-generator"></a>
                                <span lang-tag="lcd">LCD Character Generator</span>
                            </div>
                        </div>
                        <span lang-tag="projects">Projects</span>
                    </div>
                    <div class="menu">
                        <input title="Games" class="pin-menu" type="checkbox">
                        <div class="filled games icon"></div>
                        <div class="expand">
                            <div>
                                <a title="Tetris" class="filled tetris icon" href="/games/tetris"></a>
                                <span>Tetris</span>
                            </div>
                            <div>
                                <a title="Snake" class="filled snake icon" href="/games/snake"></a>
                                <span>Snake</span>
                            </div>
                            <div>
                                <a title="Bird" class="filled bird icon" href="/games/bird"></a>
                                <span>Bird</span>
                            </div>
                            <div>
                                <a title="Tic Tac Toe" class="filled tic-tac-toe icon" href="/games/tic-tac-toe"></a>
                                <span lang-tag="xox">Tic Tac Toe</span>
                            </div>
                            <div>
                                <a title="Ping Pong" class="filled pong icon" href="/games/pong"></a>
                                <span lang-tag="pong">Ping Pong</span>
                            </div>
                        </div>
                        <span lang-tag="games">Games</span>
                    </div>
                    <div>
                        <a title="Resume" class="filled resume icon" href="/resume"></a>
                        <span lang-tag="resume">Resume</span>
                    </div>
                    <div>
                        <a title="Blog" class="filled blog icon" href="/blog"></a>
                        <span>Blog</span>
                    </div>
                    <div class="menu">
                        <input title="Settings" class="pin-menu" type="checkbox">
                        <div class="filled settings icon"></div>
                        <div class="expand">
                            <div>
                                <div title="Türkçe" lang-name="tr" class="filled tr icon lang-button" ${lang_support}></div>
                            </div>
                            <div>
                                <div title="English" lang-name="en" class="filled en icon lang-button" ${lang_support}></div>
                            </div>
                        </div>
                        <span lang-tag="settings">Settings</span>
                    </div>
                    <div>
                        <input id="collapse" aria-label="collapse" type="checkbox">
                        <div class="filled back icon"></div>
                    </div>
                </div>
                <div class="sub">
                    <div class="grid-3"><div class="filled"></div></div>
                    <div class="grid-8"><div class="filled"></div></div>
                </div>
            </div>
        `;
        document.getElementById('collapse').addEventListener('change', this.handleCollapseChange);
        const pins = document.getElementsByClassName('pin-menu');
        for (const pin of pins) pin.addEventListener('change', e => this.handleExpandChange(e, pins));
        let x = window.matchMedia('(max-width: 750px)');
        x.addEventListener('change', this.handleMediaQuery);       // Attach listener function on state changes
        this.handleMediaQuery(x);                                  // Call listener function at run time
    }
}
customElements.define('side-nav', Sidenav);