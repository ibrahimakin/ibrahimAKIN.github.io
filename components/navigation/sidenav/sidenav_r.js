class Sidenav extends HTMLElement {
    handleExpand(e, pins) {
        for (const pin of pins) if (e.target !== pin) pin.checked = false;
    }
    connectedCallback() {
        const lang_support = typeof lang_obj === 'undefined' ? 'disabled' : '';
        this.innerHTML = `
            <div id="sidenav">
                <div class="main sub">
                    <div>
                        <a title="Home" class="filled home icon" href="/"></a>
                        <span lang-tag="home">Home</span>
                    </div>
                    <div></div>
                    <div class="menu">
                        <div class="filled project icon"></div>
                        <input title="Projects" class="pin-menu" type="checkbox">
                        <div class="expand">
                            <div>
                                <a title="Language App" class="filled smile-n icon" href="/projects/language-app"></a>
                                <span>Language App</span>
                                <div>
                                    <a title="Code Playground" class="filled code icon" href="/projects/code-playground"></a>
                                    <span>Code Playground</span>
                                    <div>
                                        <a title="Face Detector" class="filled face icon" href="/projects/face-detector"></a>
                                        <span lang-tag="face_detector">Face Detector</span>
                                        <div>
                                            <a title="Movies" class="filled movies icon" href="/projects/movies"></a>
                                            <span lang-tag="nav_movies">Movies</span>
                                            <div>
                                                <a title="LCD Character Generator" class="filled iicon icon" href="/projects/lcd-character-generator"></a>
                                                <span lang-tag="lcd">LCD Character Generator</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span lang-tag="projects">Projects</span>
                    </div>
                    <div class="menu">
                        <div class="filled games icon"></div>
                        <input title="Games" class="pin-menu" type="checkbox">
                        <div class="expand more" style="--extra:1">
                            <div>
                                <a title="Tetris" class="filled tetris icon" href="/games/tetris"></a>
                                <span>Tetris</span>
                                <div>
                                    <a title="Snake" class="filled snake icon" href="/games/snake"></a>
                                    <span>Snake</span>
                                    <div>
                                        <a title="Bird" class="filled bird icon" href="/games/bird"></a>
                                        <span>Bird</span>
                                        <div>
                                            <a title="Tic Tac Toe" class="filled tic-tac-toe icon" href="/games/tic-tac-toe"></a>
                                            <span lang-tag="xox">Tic Tac Toe</span>
                                            <div>
                                                <a title="Ping Pong" class="filled pong icon" href="/games/pong"></a>
                                                <span lang-tag="pong">Ping Pong</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        <div class="filled settings icon"></div>
                        <input title="Settings" class="pin-menu" type="checkbox">
                        <div class="expand more" style="--extra:1">
                            <div>
                                <a title="Türkçe" lang-name="tr" class="filled tr icon lang-button" href="#" ${lang_support}></a>
                                <div>
                                    <a title="English" lang-name="en" class="filled en icon lang-button" href="#" ${lang_support}></a>
                                </div>
                            </div>
                        </div>
                        <span lang-tag="settings">Settings</span>
                    </div>
                </div>
            </div>
        `;
        const pins = document.getElementsByClassName('pin-menu');
        for (const pin of pins) pin.addEventListener('change', e => this.handleExpand(e, pins));
    }
}
customElements.define('side-nav', Sidenav);