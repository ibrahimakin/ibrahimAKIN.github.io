const result = document.getElementById('result');
const restxt = document.getElementById('restxt');
const definition = document.getElementById('definition');
const en = document.getElementById('en');
const tr = document.getElementById('tr');

let en_value = '', tr_value = '';
let img = '', quo = '', def = '';
let type = 'sentence';

function handleChange() {
    let image = img.length && img.trim().length ? `,\n    "img": "/projects/language-app/source/img/${img}"` : '';
    let quote = quo.length && quo.trim().length ? `,\n    "quotes": "${quo}"` : '';
    let defin = def.length && def.trim().length ? `,\n    "def": "${def}"` : '';
    result.innerText = `, {
    "type": "${type}",
    "en": "${en_value}",
    "tr": "${tr_value}",
    "en_s": "",
    "tr_s": ""${image}${quote}${defin}
}`;
}

function handleCheck(radio) {
    type = radio.value;
    if (type === 'word') definition.removeAttribute('style');
    else definition.style.display = 'none';
    handleChange();
}

document.getElementById('tsl').addEventListener('click', () => {
    window.open('https://translate.google.com/?sl=en&tl=tr&text=' + escape(en.value), '_blank');
});

document.getElementById('enb').addEventListener('click', () => {
    fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=tr&dt=bd&dt=t&dj=1&q=' + en_value)
        .then(res => res.json())
        .then(data => {
            let translation = '';
            for (const sentence of data.sentences) translation += sentence.trans;
            tr.value = translation;
            tr_value = translation;
            handleChange();
        });
});

document.getElementById('trb').addEventListener('click', () => {
    fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=bd&dt=t&dj=1&q=' + tr_value)
        .then(res => res.json())
        .then(data => {
            let translation = '';
            for (const sentence of data.sentences) translation += sentence.trans;
            en.value = translation;
            en_value = translation;
            handleChange();
        });
});

en.addEventListener('input', e => {
    en_value = e.target.value;
    handleChange();
});

tr.addEventListener('input', e => {
    tr_value = e.target.value;
    handleChange();
});

document.getElementById('img').addEventListener('input', e => {
    img = e.target.value;
    handleChange();
});

document.getElementById('quo').addEventListener('input', e => {
    quo = e.target.value;
    handleChange();
});

document.getElementById('def').addEventListener('input', e => {
    def = e.target.value;
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