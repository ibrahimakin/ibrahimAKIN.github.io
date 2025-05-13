const URL = 'https://api.a101prod.retter.io/dbmk89vnr/';
const select = document.forms[0].firstElementChild;
const cards = JSON.parse(localStorage.getItem('gift_cards')) || [];
let accessToken = localStorage.getItem('gift_access_token');
let refreshToken = localStorage.getItem('gift_refresh_token');
let phone = localStorage.getItem('gift_phone');
let index = localStorage.getItem('gift_index');
let balanceStr, balance, lastCard, lastPin, loading = false;

if (!accessToken) {
    document.forms[0].classList.add('hidden');
    document.forms[1].removeAttribute('class');
    document.forms[1][0].focus();
}

if (phone) {
    document.forms[1][0].value = phone;
}

function setSelected(i) {
    const p = select.firstElementChild.children;
    if (i >= 0 && cards[i]) {
        p[0].innerText = cards.length > 1 ? index + 1 : '';
        p[1].innerText = cards[i].cardNo;
        p[0].removeAttribute('lang-tag');
    }
    else {
        p[0].innerText = lang_obj[current]['cards'];
        p[0].setAttribute('lang-tag', 'cards');
        p[1].innerText = '';
    }
}

function fillForm(i) {
    if (cards.length > 0 && cards.length > i) {
        index = i > 0 ? parseInt(i) : 0;
        balanceStr = '₺' + (cards[index].balance / 100).toLocaleString('tr', { minimumFractionDigits: 2 });
        balance = cards[index].balance;
        lastCard = cards[index].cardNo;
        lastPin = cards[index].pinNo;
    }

    if (lastCard) {
        document.forms[0][0].value = lastCard;
        setSelected(index);
    }

    if (lastPin) {
        document.forms[0][1].value = lastPin;
    }

    if (balanceStr) {
        const p = document.forms[0].children;
        p[9].innerHTML = '<span></span>';
        p[9].lastChild.setAttribute('lang-tag', 'last');
        p[9].lastChild.innerText = lang_obj[current]['last'];
        const span = document.createElement('span');
        span.innerText = balanceStr;
        p[9].append(span);
        p[10].innerText = '';
        p[11].innerText = '';
    }
}

function handleSelect(e, i) {
    e.stopPropagation();
    localStorage.setItem('gift_index', i);
    e.currentTarget.blur();
    fillForm(i);
}

function fillSelect() {
    const options = select.lastElementChild.firstElementChild;
    let total = 0, show = false;
    options.innerHTML = '';
    if (cards.length > 0) {
        select.classList.remove('hidden');
    }
    for (let i = 0; i < cards.length; i++) {
        total += cards[i].balance;
        if (total > cards[i].balance && cards[i].balance > 0) {
            show = true;
        }
        const option = document.createElement('div');
        const bstr = (cards[i].balance / 100).toLocaleString('tr', { minimumFractionDigits: 2 });
        option.innerHTML = `${cards.length > 1 ? i + 1 : ''}<div><div>${cards[i].cardNo}</div><div>₺${bstr}</div></div>`;
        option.classList.add('option');
        option.addEventListener('click', e => handleSelect(e, i));
        option.addEventListener('keypress', e => e.key === 'Enter' && handleSelect(e, i));
        const del = document.createElement('div');
        del.innerText = '✕';
        del.addEventListener('click', e => {
            e.stopPropagation();
            cards.splice(i, 1);
            if (i === index) {
                setSelected();
                localStorage.setItem('gift_index', --index);
            }
            else if (i < index) {
                setSelected(--index);
                localStorage.setItem('gift_index', index);
            }
            else if (cards.length < 2) {
                setSelected(0);
            }
            if (cards.length > 0) {
                localStorage.setItem('gift_cards', JSON.stringify(cards));
            }
            else {
                localStorage.removeItem('gift_cards');
                localStorage.removeItem('gift_index');
                select.classList.add('hidden');
            }
            fillSelect();
        });
        option.tabIndex = 0;
        option.append(del);
        options.appendChild(option);
    }
    if (show) {
        const t = document.createElement('div');
        const tstr = (total / 100).toLocaleString('tr', { minimumFractionDigits: 2 });
        t.innerHTML = `<div lang-tag="total">${lang_obj[current]['total']}</div><div>₺${tstr}</div>`;
        options.append(t);
    }
}

async function asyncWrapper(e, callback) {
    e.preventDefault();
    if (loading) return;
    const t = e.target;
    const b = t[t.length - 1];
    b.disabled = true;
    loading = true;
    await callback(e);
    loading = false;
    b.disabled = false;
}

async function checkBalance(cardNo, pinNo) {
    const pin = CryptoJS.MD5(pinNo).toString();
    const res = await fetch(URL + 'CALL/User/checkGiftCardBalance/qRob2mtm6SHFbgGGBTlJNW7l',
        { method: 'POST', body: JSON.stringify({ cardNo, pin, service: 'ECOM' }), headers: { Authorization: 'Bearer ' + accessToken } })
        .then(res => res.json());
    const p = document.forms[0].children;
    p[10].innerText = '';
    p[11].innerText = '';
    if (res.balance >= 0) {
        const diff = res.balance - balance;
        if (diff && balance > 0 && lastCard === cardNo) {
            p[9].innerText = balanceStr;
            p[10].removeAttribute('style');
            if (diff > 0) {
                p[10].style.color = '#0f0';
                p[10].innerText = '+';
            }
            p[10].innerText += (diff / 100).toLocaleString('tr', { minimumFractionDigits: 2 });
            p[11].innerText = res.balanceStr;
        }
        else {
            p[9].innerText = res.balanceStr;
        }
        balanceStr = res.balanceStr;
        balance = res.balance;
        lastCard = cardNo;
        const i = cards.findIndex(i => i.cardNo === cardNo);
        if (cards[i]) {
            cards[i].balance = balance;
            index = i;
        }
        else {
            index = cards.length;
            cards.push({ cardNo, pinNo, balance });
        }
        setSelected(index);
        fillSelect();
        localStorage.setItem('gift_cards', JSON.stringify(cards));
        localStorage.setItem('gift_index', index);
    }
    else if (res.title) {
        p[9].innerText = res.title;
    }
    return res;
}

async function refreshTokens(customToken) {
    const endpoint = customToken ? 'auth' : 'refresh';
    const body = JSON.stringify(customToken ? { customToken } : { refreshToken });
    const res = await fetch(URL + 'TOKEN/' + endpoint, { method: 'POST', body })
        .then(res => res.json());
    if (res.accessToken) {
        accessToken = res.accessToken;
        refreshToken = res.refreshToken;
        localStorage.setItem('gift_access_token', accessToken);
        localStorage.setItem('gift_refresh_token', refreshToken);
    }
    return res;
}

async function sendOtp(p) {
    const res = await fetch(URL + 'CALL/MsisdnAuthenticator/sendOtp/90' + p,
        { method: 'POST', headers: { 'A101-User-Agent': 'web-2.0.3' } })
        .then(res => res.json());
    return res;
}

async function validateOtp(otp) {
    const res = await fetch(URL + 'CALL/MsisdnAuthenticator/validateOtp/90' + phone,
        { method: 'POST', body: JSON.stringify({ otp }) })
        .then(res => res.json());
    return res;
}

document.forms[0].addEventListener('submit', e => asyncWrapper(e, async e => {
    const pin = e.target[1].value;
    const cardNo = e.target[0].value;
    let res = await checkBalance(cardNo, pin);
    if (res.details) {
        res = await refreshTokens();
        if (res.accessToken) {
            await checkBalance(cardNo, pin);
        }
        else {
            document.forms[0].classList.add('hidden');
            document.forms[1].removeAttribute('class');
            document.forms[1][0].focus();
        }
    }
}));

document.forms[1].addEventListener('submit', e => asyncWrapper(e, async e => {
    phone = e.target[0].value;
    let res = await sendOtp(phone);
    if (res.message === 'otp_sent') {
        localStorage.setItem('gift_phone', phone);
        document.forms[1].classList.add('hidden');
        document.forms[2].removeAttribute('class');
        document.forms[2][0].focus();
    }
}));

document.forms[2].addEventListener('submit', e => asyncWrapper(e, async e => {
    const otp = e.target[0].value;
    let res = await validateOtp(otp);
    if (res.customToken) {
        res = await refreshTokens(res.customToken);
        if (res.accessToken) {
            document.forms[2].classList.add('hidden');
            document.forms[0].removeAttribute('class');
            document.forms[0][0].focus();
        }
    }
}));

document.forms[0][0].addEventListener('input', e => {
    const value = e.target.value;
    if (value.trim().length === 16) {
        const i = cards.findIndex(n => n.cardNo === value);
        if (i > -1) {
            if (index === i) {
                setSelected(i);
            }
            else {
                fillForm(i);
            }
            return;
        }
    }
    setSelected();
});

document.forms[0][2].parentElement.addEventListener('touchstart', e => {
    const t = e.currentTarget.previousElementSibling;
    t.setAttribute('focused', '');
    if (document.activeElement === t || document.activeElement === document.forms[0][0]) {
        t.setAttribute('focused', true);
    }
}, { passive: true });

document.forms[0][2].addEventListener('change', e => {
    const t = e.target;
    const p = t.parentElement.parentElement;
    const i = p.children[2];
    if (t.checked) {
        p.classList.add('show');
        i.type = 'text';
    }
    else {
        p.removeAttribute('class');
        i.type = 'password';
    }
    if (i.hasAttribute('focused')) {
        if (i.getAttribute('focused')) {
            i.focus();
        }
        i.removeAttribute('focused');
    }
    else {
        i.focus();
    }
});

fillForm(index);
fillSelect();