class Container extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `
            <top-nav></top-nav>
            <div id="main-container">
                <div id="sidenav-mobile">
                    <side-nav></side-nav>
                </div>
                <div id="content-container">
                    ${this.innerHTML}
                </div>
            </div>
        `;
        this.style.height = '100%';
    }
};
window.customElements.define('root-container', Container);