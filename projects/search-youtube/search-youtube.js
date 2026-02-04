const extension = document.getElementById('extension').firstElementChild;
const theme_cb = document.getElementById('theme');
const auto_cb = document.getElementById('auto');
const form = document.forms[0];
const inp = form[0];
let l_value = '';                   // last value
let value = '';
let c_focus;                        // current focus
let auto = true;
let script;

function closeList() {
    const list = document.getElementById('list');
    if (list) list.parentNode.removeChild(list);
}

function addActive(x) {
    for (let e of x) e.removeAttribute('class');
    if (c_focus >= x.length) c_focus = -1;
    if (c_focus < -1) c_focus = x.length - 1;
    if (c_focus < 0) inp.value = value;
    else {
        inp.value = x[c_focus].lastChild.value;
        x[c_focus].scrollIntoView({ block: "nearest", inline: "nearest" });
        x[c_focus].classList.add('active');
    }
}

function callback(res) {
    script.remove();
    closeList();
    c_focus = -1;
    l_value = res[0];
    const trim = res[0].trim();
    const length = trim.length;
    if (res[1].length > 0) {
        const a = document.createElement('div');
        a.setAttribute('id', 'list');
        const lower = trim.toLowerCase();
        inp.parentNode.parentNode.appendChild(a);
        for (let i = 0; i < res[1].length; i++) {
            const b = document.createElement('div');
            const start = res[1][i][0].indexOf(lower);
            if (start > -1) {
                if (start > 0) b.innerHTML += '<b>' + res[1][i][0].substr(0, start) + '</b>';
                b.innerHTML += res[1][i][0].substr(start, length);
                b.innerHTML += '<b>' + res[1][i][0].substr(start + length) + '</b>';
            } else {
                b.innerHTML += '<b>' + res[1][i][0] + '</b>';
            }
            b.innerHTML += '<input type="hidden" value="' + res[1][i][0] + '">';
            b.addEventListener('click', e => {
                inp.value = e.currentTarget.getElementsByTagName('input')[0].value;
                form.dispatchEvent(new Event('submit'));
            });
            a.appendChild(b);
        }
    }
    if (value.trim().length < 1) closeList();
}

function fetchData(val) {
    if (!auto) return;
    const trim = val.trim();
    const length = trim.length;
    if (length < 1) closeList();
    else {
        script = document.createElement('script');
        script.src = 'https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=en&ds=yt&callback=callback&q='+ val + '&xhr=t';
        document.body.appendChild(script);
    }
}

extension.addEventListener('click', () => inp.focus());

form.addEventListener('submit', e => {
    e.preventDefault();
    const search = e.target[0].value;
    if (search.trim().length > 0) {
        const url = 'https://www.youtube.com/results?search_query=' + search;
        window.open(url, '_blank');
    }
});

theme_cb.addEventListener('change', e => {
    const theme = e.target.checked;
    if (theme) extension.classList.add('dark');
    else extension.removeAttribute('class');
});

auto_cb.addEventListener('change', e => {
    auto = e.target.checked;
    const list = document.getElementById('list');
    if (list) {
        if (auto) {
            list.removeAttribute('style');
            if (value != l_value) {
                closeList();
                fetchData(value);
            }
        }
        else list.style.display = 'none';
    }
    else fetchData(value);
});

inp.addEventListener('input', e => {
    value = e.target.value;
    fetchData(value);
});

inp.addEventListener('keydown', e => {
    if (!auto) return;
    let x = document.getElementById('list');
    if (!x) return;
    x = x.getElementsByTagName('div');
    if (e.keyCode == 40) {          // down
        e.preventDefault();
        c_focus++;
        addActive(x);
    } else if (e.keyCode == 38) {   // up
        e.preventDefault();
        c_focus--;
        addActive(x);
    } else if (e.keyCode == 13) {   // enter
        if (c_focus > -1) {
            e.preventDefault();
            if (x) x[c_focus].click();
        }
    }
});

inp.nextElementSibling.addEventListener('click', () => {
    inp.value = '';
    inp.dispatchEvent(new Event('input'));
});