class Topnav extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        const lang_support = typeof lang_obj === 'undefined' ? 'disabled' : '';
        this.innerHTML = `
            <div id="topnav" class="main">
                <div>
                    <a title="Home" class="filled home icon" href="/"></a>
                </div>
                <div></div>
                <div class="menu">
                    <div onclick title="Project" class="filled project icon"></div>
                    <div class="expand">
                        <div>
                            <a title="Code Playground" class="filled code icon" href="/projects/code-playground"></a>
                        </div>
                        <div>
                            <a title="Face Detector" class="filled face icon" href="/projects/face-detector"></a>
                        </div>
                        <div>
                            <a title="Movies" class="filled movies icon" href="/projects/movies"></a>
                        </div>
                        <div>
                            <a title="LCD Character Generator" class="filled iicon icon" href="/projects/lcd-character-generator"></a>
                        </div>
                    </div>
                </div>
                <div class="menu">
                    <div onclick title="Games" class="filled games icon"></div>
                    <div class="expand">
                        <div>
                            <a title="Tetris" class="filled tetris icon" href="/games/tetris"></a>
                        </div>
                        <div>
                            <a title="Snake" class="filled snake icon" href="/games/snake"></a>
                        </div>
                        <div>
                            <a title="Bird" class="filled bird icon" href="/games/bird"></a>
                        </div>
                        <div>
                            <a title="Tic Tac Toe" class="filled tic-tac-toe icon" href="/games/tic-tac-toe"></a>
                        </div>
                        <div>
                            <a title="Ping Pong" class="filled pong icon" href="/games/pong"></a>
                        </div>
                    </div>
                </div>
                <div>
                    <a title="Language App" class="filled smile icon" href="/projects/language-app"></a>
                </div>
                <div>
                    <a title="Resume" class="filled resume icon" href="/resume"></a>
                </div>
                <div>
                    <a title="Blog" class="filled blog icon" href="/blog"></a>
                </div>
                <div class="menu">
                    <div onclick title="Settings" class="filled settings icon"></div>
                    <div class="expand">
                        <div>
                            <div title="Türkçe" lang-name="tr" class="filled tr icon lang-button" ${lang_support}></div>
                        </div>
                        <div>
                            <div title="English" lang-name="en" class="filled en icon lang-button" ${lang_support}></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('top-nav', Topnav);