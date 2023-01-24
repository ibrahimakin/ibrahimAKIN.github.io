class Container extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <div id="docroot">
            <div class="docapp">
                <top-nav></top-nav>
                <div id="main-container">
                    <div id="sidenav-mobile">
                        <side-nav></side-nav>
                    </div>
                    <div id="content-container">
                        ${this.innerHTML}
                    </div>
                </div>
            </div>
        </div>`;
    }
};

window.customElements.define('root-container', Container);