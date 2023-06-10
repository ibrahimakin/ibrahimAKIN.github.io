const result = document.getElementById('result');
const restxt = document.getElementById('restxt');
const definition = document.getElementById('definition');
const quote_e = document.getElementById('quote');
const type_e = document.getElementById('type');
const typ_e = document.getElementById('typ');               // part of speech - pos
const img_e = document.getElementById('img');
const quo_e = document.getElementById('quo');
const def_e = document.getElementById('def');
const imgb = document.getElementById('imgb');
const tr_e = document.getElementById('tr');
const en_e = document.getElementById('en');

let tr = '', en = '', img = '', quo = '', def = '', typ = '';
let variant = 'sentence', sentences, words;

fetch('../source/sentences.json').then(res => res.ok ? res.text() : null).then(data => sentences = data);
fetch('../source/words.json').then(res => res.ok ? res.text() : null).then(data => words = data);

function handleChange() {
    let image = img.trim().length ? `,\n    "img": "/assets/images/projects/language-app/${img}"` : '';
    let quote = quo.trim().length ? `,\n    "quo": "${quo}"` : '';
    let defin = def.trim().length ? `,\n    "def": "${def}"` : '';
    let pos = typ.trim().length ? `,\n    "pos": "${typ}"` : '';
    result.innerText = `, {\n    "en": "${en}",\n    "tr": "${tr}"${image}${quote}${defin}${pos}\n}`;
}

function handleCheck(radio) {
    variant = radio.value;
    if (variant === 'word') {
        quo = '';
        quo_e.value = '';
        imgb.removeAttribute('style');
        quote_e.style.display = 'none';
        type_e.removeAttribute('style');
        definition.removeAttribute('style');
    }
    else {
        def = '';
        typ = '';
        def_e.value = '';
        typ_e.value = '';
        definition.style.display = 'none';
        quote_e.removeAttribute('style');
        imgb.style.visibility = 'hidden';
        type_e.style.display = 'none';
    }
    hideInfo(tr_e);
    hideInfo(en_e);
    handleChange();
}

function handleFind(text, lang) {
    text.style.visibility = 'visible';
    let value = lang ? tr : en;
    if (variant === 'word') {
        if (!words) {
            text.innerText = 'Cannot get words.';
            setTimeout(() => text.removeAttribute('style'), 1000);
        }
        else if (value.trim().length && words.includes(value))
            text.innerText = 'Found in words.';
        else {
            text.innerText = 'Not found in words.';
            if (!value.trim().length) setTimeout(() => text.removeAttribute('style'), 1000);
        }
    }
    else {
        if (!sentences) {
            text.innerText = 'Cannot get sentences.';
            setTimeout(() => text.removeAttribute('style'), 1000);
        }
        else if (value.trim().length && sentences.includes(value))
            text.innerText = 'Found in sentences.';
        else {
            text.innerText = 'Not found in sentences.';
            if (!value.trim().length) setTimeout(() => text.removeAttribute('style'), 1000);
        }
    }
}

function handleTranslate(key, tl = 'tr') {
    const q = tl === 'en' ? tr : en;
    if (q.trim().length) {
        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${tl}${key ? '&dt=md' : ''}&dt=t&dj=1&q=${q}`)
            .then(res => res.json()).then(data => {
                try {
                    if (key === 'pos') {
                        typ = data.definitions[0].pos;
                        typ_e.value = typ;
                    }
                    else if (key === 'def') {
                        def = data.definitions[0].entry[0].gloss;
                        def_e.value = def;
                    }
                    else {
                        let translation = '';
                        for (let sentence of data.sentences) translation += sentence.trans;
                        if (tl === 'en') { en_e.value = translation; en = translation; }
                        else { tr_e.value = translation; tr = translation; }
                    }
                    handleChange();
                }
                catch (e) {
                    console.log(e);
                }
            });
    }
}

document.getElementById('tsl').addEventListener('click', () =>
    window.open('https://translate.google.com/?sl=en&tl=tr&text=' + escape(en), '_blank')
);

en_e.addEventListener('input', e => { en = e.target.value; hideInfo(e.target); handleChange(); });

tr_e.addEventListener('input', e => { tr = e.target.value; hideInfo(e.target); handleChange(); });

img_e.addEventListener('input', e => { img = e.target.value; handleChange(); });

quo_e.addEventListener('input', e => { quo = e.target.value; handleChange(); });

def_e.addEventListener('input', e => { def = e.target.value; handleChange(); });

typ_e.addEventListener('input', e => { typ = e.target.value; handleChange(); });

function hideInfo(e) { e.nextElementSibling.firstElementChild.removeAttribute('style'); }

function handleAutoFill(key) {
    switch (key) {
        case 'img': img = en.trim().replaceAll(' ', '_'); img_e.value = img; img_e.focus(); break;
        case 'def': handleTranslate('def'); break;
        case 'typ': handleTranslate('pos'); break;
    }
    handleChange();
}

function handleDelete(key) {
    switch (key) {
        case 'tr': tr_e.value = ''; tr = ''; hideInfo(tr_e); tr_e.focus(); break;
        case 'en': en_e.value = ''; en = ''; hideInfo(en_e); en_e.focus(); break;
        case 'img': img_e.value = ''; img = ''; img_e.focus(); break;
        case 'quo': quo_e.value = ''; quo = ''; quo_e.focus(); break;
        case 'def': def_e.value = ''; def = ''; def_e.focus(); break;
        case 'typ': typ_e.value = ''; typ = ''; typ_e.focus(); break;
    }
    handleChange();
}

function handleClear() {
    img_e.value = ''; img = '';
    quo_e.value = ''; quo = '';
    def_e.value = ''; def = '';
    typ_e.value = ''; typ = '';
    tr_e.value = ''; tr = '';
    en_e.value = ''; en = '';
    hideInfo(tr_e);
    hideInfo(en_e);
    handleChange();
    en_e.focus();
}

document.getElementById('copy').addEventListener('click', e => {
    const copied = e.target.nextElementSibling;
    const text = result.innerText;
    restxt.textContent = text;
    restxt.select();
    document.execCommand('copy');
    copied.style.opacity = 1;
    setTimeout(() => copied.removeAttribute('style'), 1000);
});