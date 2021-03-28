document.addEventListener('DOMContentLoaded', function(event) { 
    for (const button of document.getElementsByClassName('lang-button')) {    
        button.onclick = function(event) {
            let lang = event.target.getAttribute('lang-name');
            localStorage.setItem('lang', JSON.stringify(lang));
            for (const element of document.querySelectorAll('[lang-tag]')) {
                element.textContent = langObj[lang][element.getAttribute('lang-tag')];
            }
        };
    }
    let localLang = localStorage.getItem('lang');
    let lang = localLang ? JSON.parse(localLang) : 'en';
    if (lang !== 'en') {
        for (const element of document.querySelectorAll('[lang-tag]')) {                
            element.textContent = langObj[lang][element.getAttribute('lang-tag')];
        }
    }    
});