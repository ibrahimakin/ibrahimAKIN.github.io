const result = document.getElementById('result');
const restxt = document.getElementById('restxt');
const definition = document.getElementById('definition');
const quote_e = document.getElementById('quote');
const img_e = document.getElementById('img');
const quo_e = document.getElementById('quo');
const def_e = document.getElementById('def');
const en = document.getElementById('en');
const tr = document.getElementById('tr');

let en_value = '', tr_value = '';
let img = '', quo = '', def = '';
let type = 'sentence';
let words, sentences;

fetch('../source/sentences.json').then(res => res.ok ? res.text() : null).then(data => sentences = data);
fetch('../source/words.json').then(res => res.ok ? res.text() : null).then(data => words = data);

function handleChange() {
    let image = img.length && img.trim().length ? `,\n    "img": "/projects/language-app/source/img/${img}"` : '';
    let quote = quo.length && quo.trim().length ? `,\n    "quo": "${quo}"` : '';
    let defin = def.length && def.trim().length ? `,\n    "def": "${def}"` : '';
    result.innerText = `, {
    "en": "${en_value}",
    "tr": "${tr_value}"${image}${quote}${defin}
}`;
}

function handleCheck(radio) {
    type = radio.value;
    if (type === 'word') {
        quo = '';
        quo_e.value = '';
        quote_e.style.display = 'none';
        definition.removeAttribute('style');
    }
    else {
        def = '';
        def_e.value = '';
        definition.style.display = 'none';
        quote_e.removeAttribute('style');
    }
    handleChange();
}

function handleFind(text, lang) {
    text.style.visibility = 'visible';
    let value = lang ? tr_value : en_value;
    if (type === 'word') {
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

document.getElementById('tsl').addEventListener('click', () =>
    window.open('https://translate.google.com/?sl=en&tl=tr&text=' + escape(en.value), '_blank')
);

document.getElementById('enb').addEventListener('click', () => {
    fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=tr&dt=bd&dt=t&dj=1&q=' + en_value)
        .then(res => res.json()).then(data => {
            let translation = '';
            for (const sentence of data.sentences) translation += sentence.trans;
            tr.value = translation;
            tr_value = translation;
            handleChange();
        });
});

document.getElementById('trb').addEventListener('click', () => {
    fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=bd&dt=t&dj=1&q=' + tr_value)
        .then(res => res.json()).then(data => {
            let translation = '';
            for (const sentence of data.sentences) translation += sentence.trans;
            en.value = translation;
            en_value = translation;
            handleChange();
        });
});

document.getElementById('enf').addEventListener('click', e => handleFind(e.target.previousElementSibling));
document.getElementById('trf').addEventListener('click', e => handleFind(e.target.previousElementSibling, true));

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

document.getElementById('imgd').addEventListener('click', () => {
    img_e.value = '';
    img = '';
    handleChange();
});

document.getElementById('quod').addEventListener('click', () => {
    quo_e.value = '';
    quo = '';
    handleChange();
});

document.getElementById('defd').addEventListener('click', () => {
    def_e.value = '';
    def = '';
    handleChange();
});

document.getElementById('copy').addEventListener('click', e => {
    const copied = e.target.nextElementSibling;
    const text = result.innerText;
    restxt.textContent = text;
    restxt.select();
    document.execCommand('copy');
    copied.style.opacity = 1;
    setTimeout(() => copied.removeAttribute('style'), 1000);
});