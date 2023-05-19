let current = getLang();
document.addEventListener('DOMContentLoaded', () => {
    for (const button of document.getElementsByClassName('lang-button')) {
        button.onclick = event => {
            let lang = event.target.getAttribute('lang-name');
            if (lang !== getLang() || lang !== current) {
                current = lang;
                try { localStorage.setItem('lang', lang); } catch (e) { }
                for (const element of document.querySelectorAll('[lang-tag]')) {
                    let value = lang_obj[lang][element.getAttribute('lang-tag')];
                    if (element.placeholder) element.placeholder = value;
                    else if (element.title.length) element.title = value;
                    else element.textContent = value;
                }
                // document.documentElement.setAttribute('lang', lang);
            }
        };
    }
    if (current !== 'en') {
        for (const element of document.querySelectorAll('[lang-tag]')) {
            let value = lang_obj[current][element.getAttribute('lang-tag')];
            if (element.placeholder) element.placeholder = value;
            else if (element.title.length) element.title = value;
            else element.textContent = value;
        }
        // document.documentElement.setAttribute('lang', lang); // Gets a reference to the root node of the document.
    }
});

function getLang() {
    let lang;
    try { lang = localStorage.getItem('lang'); }
    catch (e) { }
    return lang in lang_obj ? lang : 'en';
}