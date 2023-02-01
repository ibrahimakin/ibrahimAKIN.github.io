let current = getLang();
document.addEventListener('DOMContentLoaded', () => {
    for (const button of document.getElementsByClassName('lang-button')) {
        button.onclick = event => {
            let lang = event.target.getAttribute('lang-name');
            if (lang !== getLang() || lang !== current) {
                current = lang;
                try { localStorage.setItem('lang', JSON.stringify(lang)); } catch (e) { }
                for (const element of document.querySelectorAll('[lang-tag]')) {
                    element.textContent = lang_obj[lang][element.getAttribute('lang-tag')];
                }
                // document.documentElement.setAttribute('lang', lang);
            }
        };
    }
    if (current !== 'en') {
        for (const element of document.querySelectorAll('[lang-tag]')) {
            element.textContent = lang_obj[current][element.getAttribute('lang-tag')];
        }
        // document.documentElement.setAttribute('lang', lang); // Gets a reference to the root node of the document.
    }
});

function getLang() {
    let localLang;
    try { localLang = localStorage.getItem('lang'); }
    catch (e) { }
    return localLang ? JSON.parse(localLang) : 'en';
}