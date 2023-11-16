const result = document.getElementById('result');
const restxt = document.getElementById('restxt');
const definition = document.getElementById('definition');
const quote_e = document.getElementById('quote');
const type_e = document.getElementById('type');
const typ_e = document.getElementById('typ');                               // part of speech - pos
const img_e = document.getElementById('img');
const quo_e = document.getElementById('quo');
const def_e = document.getElementById('def');
const imgb = document.getElementById('imgb');
const tr_e = document.getElementById('tr');
const en_e = document.getElementById('en');
const ul = document.querySelector('ul');

let tr = '', en = '', img = '', quo = '', def = '', typ = '', find = '', variant = 'words';
const source = { sentences: '', words: '' };

fetch('../source/sentences.json').then(res => res.ok ? res.text() : null).then(data => source.sentences = data);
fetch('../source/words.json').then(res => res.ok ? res.text() : null).then(data => source.words = data);

function handleChange() {
    let image = img.trim().length ? `,\n    "img": "/assets/images/projects/language-app/${img}"` : '';
    let quote = quo.trim().length ? `,\n    "quo": "${quo}"` : '';
    let defin = def.trim().length ? `,\n    "def": "${def}"` : '';
    let pos = typ.trim().length ? `,\n    "pos": "${typ}"` : '';
    result.innerText = `, {\n    "en": "${en}",\n    "tr": "${tr}"${image}${quote}${defin}${pos}\n}`;
}

function handleCheck(radio) {
    variant = radio.value;
    if (variant === 'words') {
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
    hideInfo(tr_e, 'tr');
    hideInfo(en_e, 'en');
    handleChange();
}

function handleFind(text, lang) {
    text.style.visibility = 'visible';
    let value = lang ? tr : en;
    if (!source[variant]) {
        text.innerText = `Cannot get ${variant}.`;
        setTimeout(() => text.removeAttribute('style'), 1000);
    }
    else if (value.trim().length && source[variant].includes(value)) {
        const re = new RegExp(`\{[^\{]*?${value}(.|\n)*?\}`, 'gm');         // gm -> global, multiline
        const arr = source[variant].match(re);
        text.innerText = `Found in ${variant}. ${arr.length}`;
        ul.innerHTML = '';
        find = lang ? 'tr' : 'en';
        for (const iter of arr) {
            const res = iter.replaceAll(value, `<b>${value}</b>`);
            const pre = document.createElement('pre');
            const li = document.createElement('li');
            pre.innerHTML = res;
            li.append(pre);
            ul.append(li);
        }
    }
    else {
        text.innerText = `Not found in ${variant}.`;
        if (!value.trim().length) setTimeout(() => text.removeAttribute('style'), 1000);
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
                        if (tl === 'en') {
                            if (translation !== en) {
                                en_e.value = translation; en = translation;
                                hideInfo(en_e, tl);
                            }
                        }
                        else if (translation !== tr) {
                            tr_e.value = translation; tr = translation;
                            hideInfo(tr_e, tl);
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
    window.open('https://translate.google.com/?sl=en&tl=tr&text=' + escape(en), '_blank')
);

en_e.addEventListener('input', e => { en = e.target.value; hideInfo(e.target, 'en'); handleChange(); });

tr_e.addEventListener('input', e => { tr = e.target.value; hideInfo(e.target, 'tr'); handleChange(); });

img_e.addEventListener('input', e => { img = e.target.value; handleChange(); });

quo_e.addEventListener('input', e => { quo = e.target.value; handleChange(); });

def_e.addEventListener('input', e => { def = e.target.value; handleChange(); });

typ_e.addEventListener('input', e => { typ = e.target.value; handleChange(); });

function hideInfo(e, tl) {
    e.nextElementSibling.firstElementChild.removeAttribute('style');
    if (find == tl) ul.innerHTML = '';
}

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
        case 'tr': tr_e.value = ''; tr = ''; hideInfo(tr_e, key); tr_e.focus(); break;
        case 'en': en_e.value = ''; en = ''; hideInfo(en_e, key); en_e.focus(); break;
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
    hideInfo(tr_e, 'tr');
    hideInfo(en_e, 'en');
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