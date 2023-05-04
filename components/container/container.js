class Container extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `
            <top-nav></top-nav>
            <div id="main-container">
                <side-nav></side-nav>
                ${this.innerHTML}
            </div>
        `;
    }
};
window.customElements.define('root-container', Container);