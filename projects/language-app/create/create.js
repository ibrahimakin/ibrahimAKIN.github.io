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
const en = document.getElementById('en');
const tr = document.getElementById('tr');

let en_value = '', tr_value = '';
let img = '', quo = '', def = '', typ = '';
let variant = 'sentence';
let words, sentences;

fetch('../source/sentences.json').then(res => res.ok ? res.text() : null).then(data => sentences = data);
fetch('../source/words.json').then(res => res.ok ? res.text() : null).then(data => words = data);

function handleChange() {
    let image = img.trim().length ? `,\n    "img": "/assets/images/projects/language-app/${img}"` : '';
    let quote = quo.trim().length ? `,\n    "quo": "${quo}"` : '';
    let defin = def.trim().length ? `,\n    "def": "${def}"` : '';
    let pos = typ.trim().length ? `,\n    "pos": "${typ}"` : '';
    result.innerText = `, {
    "en": "${en_value}",
    "tr": "${tr_value}"${image}${quote}${defin}${pos}
}`;
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
        def_e.value = '';
        definition.style.display = 'none';
        quote_e.removeAttribute('style');
        imgb.style.visibility = 'hidden';
        type_e.style.display = 'none';
    }
    handleChange();
}

function handleFind(text, lang) {
    text.style.visibility = 'visible';
    let value = lang ? tr_value : en_value;
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
    const q = tl === 'en' ? tr_value : en_value;
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
                        if (tl === 'en') {
                            en.value = translation;
                            en_value = translation;
                        }
                        else {
                            tr.value = translation;
                            tr_value = translation;
                        }
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
    window.open('https://translate.google.com/?sl=en&tl=tr&text=' + escape(en.value), '_blank')
);

en.addEventListener('input', e => {
    en_value = e.target.value;
    e.target.nextElementSibling.removeAttribute('style');
    handleChange();
});

tr.addEventListener('input', e => {
    tr_value = e.target.value;
    e.target.nextElementSibling.removeAttribute('style');
    handleChange();
});

img_e.addEventListener('input', e => { img = e.target.value; handleChange(); });

quo_e.addEventListener('input', e => { quo = e.target.value; handleChange(); });

def_e.addEventListener('input', e => { def = e.target.value; handleChange(); });

typ_e.addEventListener('input', e => { typ = e.target.value; handleChange(); });

function handleAutoFill(key) {
    switch (key) {
        case 'img':
            img = en_value.trim().replaceAll(' ', '_');
            img_e.value = img;
            break;
        case 'def': handleTranslate('def'); break;
        case 'typ': handleTranslate('pos'); break;
    }
    handleChange();
}

function handleDelete(key) {
    switch (key) {
        case 'img': img_e.value = ''; img = ''; break;
        case 'quo': quo_e.value = ''; quo = ''; break;
        case 'def': def_e.value = ''; def = ''; break;
        case 'typ': typ_e.value = ''; typ = ''; break;
        case 'tr': tr.value = ''; tr_value = ''; break;
        case 'en': en.value = ''; en_value = ''; break;
    }
    handleChange();
}

function handleClear() {
    img_e.value = ''; img = '';
    quo_e.value = ''; quo = '';
    def_e.value = ''; def = '';
    typ_e.value = ''; typ = '';
    tr.value = ''; tr_value = '';
    en.value = ''; en_value = '';
    handleChange();
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