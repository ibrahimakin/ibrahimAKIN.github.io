document.addEventListener('DOMContentLoaded', function(event) { 
    for (const button of document.getElementsByClassName('lang-button')) {    
        button.onclick = function(event) {
            let lang = event.target.getAttribute('lang-name');
            if (lang !== getLang()) {
                localStorage.setItem('lang', JSON.stringify(lang));
                for (const element of document.querySelectorAll('[lang-tag]')) {
                    element.textContent = langObj[lang][element.getAttribute('lang-tag')];
                }
            }
        };
    }
    let lang = getLang();
    if (lang !== 'en') {
        for (const element of document.querySelectorAll('[lang-tag]')) {                
            element.textContent = langObj[lang][element.getAttribute('lang-tag')];
        }
    }    
});

function getLang() {
    let localLang = localStorage.getItem('lang');
    return localLang ? JSON.parse(localLang) : 'en';
}