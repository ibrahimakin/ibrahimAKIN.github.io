let current = getLang();
document.addEventListener('DOMContentLoaded', function () {
    for (const button of document.getElementsByClassName('lang-button')) {
        button.onclick = function (event) {
            let lang = event.target.getAttribute('lang-name');
            if (lang !== getLang() || lang !== current) {
                current = lang;
                try { localStorage.setItem('lang', JSON.stringify(lang)); } catch (e) { }
                for (const element of document.querySelectorAll('[lang-tag]')) {
                    element.textContent = langObj[lang][element.getAttribute('lang-tag')];
                }
                // document.documentElement.setAttribute('lang', lang);
            }
        };
    }
    if (current !== 'en') {
        for (const element of document.querySelectorAll('[lang-tag]')) {
            element.textContent = langObj[current][element.getAttribute('lang-tag')];
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