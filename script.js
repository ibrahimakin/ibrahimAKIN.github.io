document.addEventListener('DOMContentLoaded', function(event) { 
    for (const button of document.getElementsByClassName('lang-button')) {    
        button.onclick = function(event) {
            let lang = event.target.getAttribute('lang-name');
            if (lang !== getLang()) {
                localStorage.setItem('lang', JSON.stringify(lang));
                for (const element of document.querySelectorAll('[lang-tag]')) {
                    element.textContent = langObj[lang][element.getAttribute('lang-tag')];
                }
                // document.documentElement.setAttribute('lang', lang);
            }
        };
    }
    let lang = getLang();
    if (lang !== 'en') {
        for (const element of document.querySelectorAll('[lang-tag]')) {                
            element.textContent = langObj[lang][element.getAttribute('lang-tag')];
        }
        // document.documentElement.setAttribute('lang', lang); // Gets a reference to the root node of the document.
    }    
});

function getLang() {
    let localLang = localStorage.getItem('lang');
    return localLang ? JSON.parse(localLang) : 'en';
}