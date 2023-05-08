class Container extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `
            <top-nav></top-nav>
            <side-nav></side-nav>
            ${this.innerHTML}
        `;
    }
};
window.customElements.define('root-container', Container);