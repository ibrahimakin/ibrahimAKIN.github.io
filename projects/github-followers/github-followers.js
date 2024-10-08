const blocked = localStorage.getItem('github_blocked')?.split(',') || [];
const input = document.querySelector('input[type=search]');
const table = document.getElementsByTagName('table')[0];
const p = document.getElementsByTagName('p')[0];
let newtab = false, cur = '';   // current user

function display(place, data, type) {
    const ul = document.getElementById(type + '_' + place);
    for (const item of data) {
        const b = document.createElement('button');
        const c = document.createElement('button');
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
        li.appendChild(a);
        li.appendChild(b);
        li.appendChild(c);
        ul.appendChild(li);
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
    for (const key in res) {
        let url = `https://api.github.com/users/${user}/${key}?per_page=100&page=`;
        let data = [{}];
        for (let i = 1; data.length > 0; i++) {
            data = await (await fetch(url + i)).json();
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
            display(key, data, 'all');
            res[key].push(...data);
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
    if (blocked.length < 1) localStorage.removeItem('github_blocked');
    else localStorage.setItem('github_blocked', blocked);
}

function handleSubmit(e) {
    e.preventDefault();
    const value = e.target[0].value;
    if (!newtab) setURL(value);
    fetchData(value);
}

window.addEventListener('popstate', loadPage);

loadPage();