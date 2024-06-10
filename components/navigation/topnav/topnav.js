class Topnav extends HTMLElement {
    connectedCallback() {
        const lang_support = typeof lang_obj === 'undefined' ? 'disabled' : '';
        this.innerHTML = `
            <div id="topnav" class="main">
                <div>
                    <a title="Home" class="filled home" href="/" lang-tag="nav_home"></a>
                </div>
                <div></div>
                <div class="menu hvr">
                    <div title="Projects" class="filled project" lang-tag="projects"></div>
                    <div class="expand">
                        <div>
                            <a title="Search YouTube" class="filled search" href="/projects/search-youtube"></a>
                        </div>
                        <div>
                            <a title="Language App" class="filled smile-n" href="/projects/language-app"></a>
                        </div>
                        <div>
                            <a title="Code Playground" class="filled code" href="/projects/code-playground"></a>
                        </div>
                        <div>
                            <a title="Face Detector" class="filled face" href="/projects/face-detector" lang-tag="face_detector"></a>
                        </div>
                        <div>
                            <a title="Movies" class="filled movies" href="/projects/movies" lang-tag="nav_movies"></a>
                        </div>
                        <div>
                            <a title="LCD Character Generator" class="filled iicon" href="/projects/lcd-character-generator" lang-tag="lcd"></a>
                        </div>
                    </div>
                </div>
                <div class="menu hvr">
                    <div title="Games" class="filled games" lang-tag="games"></div>
                    <div class="expand">
                        <div>
                            <a title="Tetris" class="filled tetris" href="/games/tetris"></a>
                        </div>
                        <div>
                            <a title="Snake" class="filled snake" href="/games/snake"></a>
                        </div>
                        <div>
                            <a title="Bird" class="filled bird" href="/games/bird"></a>
                        </div>
                        <div>
                            <a title="Tic Tac Toe" class="filled tic-tac-toe" href="/games/tic-tac-toe" lang-tag="xox"></a>
                        </div>
                        <div>
                            <a title="Ping Pong" class="filled pong" href="/games/pong" lang-tag="pong"></a>
                        </div>
                    </div>
                </div>
                <div>
                    <a title="Resume" class="filled resume" href="/resume" lang-tag="resume"></a>
                </div>
                <div>
                    <a title="Blog" class="filled blog" href="/blog"></a>
                </div>
                <div class="menu hvr">
                    <div title="Settings" class="filled settings" lang-tag="settings"></div>
                    <div class="expand">
                        <div>
                            <div title="Türkçe" lang-name="tr" class="filled tr lang-button" tabindex="0" ${lang_support}></div>
                        </div>
                        <div>
                            <div title="English" lang-name="en" class="filled en lang-button" tabindex="0" ${lang_support}></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const pins = this.getElementsByClassName('menu');
        for (const pin of pins) {
            pin.addEventListener('touchstart', e => {
                if (e.target.open) {
                    e.target.parentElement.classList.remove('hvr');
                    delete e.target.open;
                }
                else {
                    e.target.parentElement.classList.add('hvr');
                    e.target.open = true;
                }
            }, { passive: true });
            pin.addEventListener('mouseleave', e => {
                delete e.target.firstElementChild.open;
                e.target.classList.add('hvr');
            });
        }
    }
}
customElements.define('top-nav', Topnav);