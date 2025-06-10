const blocked_e = document.forms[0].nextElementSibling;
const blocked_t = document.getElementById('blocked');
const input = document.querySelector('input[type=search]');
const table = document.getElementsByTagName('table')[0];
const p = document.getElementsByTagName('p')[0];
const checkbox = document.forms[0][3];
let blocked = localStorage.getItem('github_blocked')?.split(',') || [];
let newtab = false, cur = '';   // current user

function display(place, data, type, pre) {
    const ul = document.getElementById(type + '_' + place);
    for (const item of data) {
        const b = document.createElement('button');
        const c = document.createElement('button');
        const d = document.createElement('div');
        const img = document.createElement('img');
        const li = document.createElement('li');
        const a = document.createElement('a');
        img.src = item.avatar_url;
        a.innerText = item.login;
        b.onclick = handleSearch;
        c.onclick = handleBlock;
        a.href = item.html_url;
        b.value = item.login;
        c.value = item.login;
        img.alt = 'avatar';
        a.target = '_blank';
        b.title = lang_obj[current]['search'];
        b.setAttribute('lang-tag', 'search');
        c.title = lang_obj[current]['block'];
        c.setAttribute('lang-tag', 'block');
        if (blocked.includes(item.login)) c.style.color = '#f00';
        c.innerText = '⨯';
        b.innerText = '.';
        a.prepend(img);
        d.appendChild(b);
        d.appendChild(c);
        li.appendChild(a);
        li.appendChild(d);
        if (pre) ul.prepend(li);
        else ul.appendChild(li);
    }
}

function counts(place, data, type) {
    const span = document.getElementById('c_' + type + '_' + place);
    span.innerText = ` (${data})`;
}

function play(scene) {
    if (scene === 1) {
        table.removeAttribute('style');
        p.style.display = 'none';
    }
    else if (scene === 0) {
        table.style.display = 'none';
        p.removeAttribute('style');
    }
}

function clear() {
    for (const c of ['', 'c_']) {
        for (const type of ['all', 'dif']) {
            for (const place of ['followers', 'following']) {
                document.getElementById(c + type + '_' + place).innerHTML = '';
            }
        }
    }
}

async function fetchData(user) {
    const res = { followers: [], following: [] };
    const blocked_following = [];
    for (const key in res) {
        let url = `https://api.github.com/users/${user}/${key}?per_page=100&page=`;
        let data = [], len = 0, i = 0;
        do {
            data = await (await fetch(url + ++i)).json();
            if (!Array.isArray(data)) {
                p.innerText = data.message;
                play(0);
                return;
            }
            else if (newtab) {
                window.open('https://github.com/' + user, '_blank');
                newtab = false;
                return;
            }
            else if (i === 1 && key === Object.keys(res)[0]) {
                clear();
                play(1);
            }
            len = data.length;
            if (key === Object.keys(res)[1]) {
                for (let j = 0; j < data.length; j++) {
                    if (blocked.includes(data[j].login)) {
                        blocked_following.push(data.splice(j, 1)[0]);
                    }
                }
            }
            display(key, data, 'all');
            res[key].push(...data);
        } while (len === 100);
        if (key === Object.keys(res)[1] && blocked_following.length > 0) {
            display(key, blocked_following, 'all', true);
            res[key].unshift(...blocked_following);
        }
        counts(key, res[key].length, 'all');
    }

    // Get items that only occur in the left array,
    // using the compare function to determine equality.
    const compare = (left, right) => left.filter(a => !right.some(b => a.login === b.login));

    const result = { followers: [], following: [] };
    result.followers = compare(res.followers, res.following);
    result.following = compare(res.following, res.followers);
    for (const key in result) {
        counts(key, result[key].length, 'dif');
        display(key, result[key], 'dif');
    }
}

function setURL(user) {
    if (cur != user) {
        const url = new URL(window.location);
        url.searchParams.set('user', user);
        window.history.pushState({}, '', url);
        cur = user;
    }
}

function loadPage() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (search, prop) => search.get(prop)
    });
    const value = params.user;
    if (value) {
        input.value = value;
        fetchData(value);
        cur = value;
    }
}

function handleSearch(e) {
    newtab = false;
    const value = e.target.value;
    input.value = value;
    fetchData(value);
    setURL(value);
}

function handleBlock(e) {
    const value = e.target.value;
    const index = blocked.indexOf(value);
    if (index > -1) {
        e.target.removeAttribute('style');
        blocked.splice(index, 1);
    }
    else {
        e.target.style.color = '#f00';
        blocked.push(value);
    }
    blocked_e.setAttribute('count', blocked.length);
    if (blocked.length < 1) localStorage.removeItem('github_blocked');
    else localStorage.setItem('github_blocked', blocked);
    blocked_t.value = blocked;
}

function handleSubmit(e) {
    e.preventDefault();
    const value = e.target[0].value;
    if (!newtab) setURL(value);
    fetchData(value);
}

function handleChange() {
    if (checkbox.checked) {
        if (blocked.length > 0) blocked_t.value = blocked;
        blocked_e.style.display = 'flex';
    }
    else {
        blocked_e.removeAttribute('style');
    }
}

function handleClick(e, t) {
    if (t) {
        blocked_t.select();
        document.execCommand('copy');
    }
    else {
        const value = blocked_t.value;
        if (value.trim()) {
            localStorage.setItem('github_blocked', value);
            blocked = value.split(',');
        }
        else {
            localStorage.removeItem('github_blocked');
            blocked = [];
        }
        blocked_e.setAttribute('count', blocked.length);
    }
    const txt = e.nextElementSibling;
    txt.style.visibility = 'unset';
    setTimeout(() => txt.removeAttribute('style'), 1000);
}

blocked_e.setAttribute('count', blocked.length);

window.addEventListener('load', handleChange);

window.addEventListener('popstate', loadPage);

loadPage();