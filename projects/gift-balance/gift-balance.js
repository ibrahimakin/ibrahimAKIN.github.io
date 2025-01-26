const URL = 'https://api.a101prod.retter.io/dbmk89vnr/';
let accessToken = localStorage.getItem('gift_access_token');
let refreshToken = localStorage.getItem('gift_refresh_token');
let balanceStr = localStorage.getItem('gift_balance_str');
let balance = localStorage.getItem('gift_balance');
let lastCard = localStorage.getItem('gift_card');
let lastPin = localStorage.getItem('gift_pin');
let phone = localStorage.getItem('gift_phone');
let loading = false;

if (!accessToken) {
    document.forms[0].classList.add('hidden');
    document.forms[1].removeAttribute('class');
    document.forms[1][0].focus();
}

if (lastCard) {
    document.forms[0][0].value = lastCard;
}

if (lastPin) {
    document.forms[0][1].value = lastPin;
}

if (balanceStr) {
    const p = document.forms[0].children[7];
    p.lastChild.setAttribute('lang-tag', 'last');
    p.lastChild.innerText = lang_obj[current]['last'];
    const span = document.createElement('span');
    span.innerText = balanceStr;
    p.append(span);
}

if (phone) {
    document.forms[1][0].value = phone;
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
    p[8].innerText = '';
    p[9].innerText = '';
    if (res.balance >= 0) {
        const diff = res.balance - balance;
        if (diff && balance > 0) {
            p[7].innerText = balanceStr;
            p[8].removeAttribute('style');
            if (diff > 0) {
                p[8].style.color = '#0f0';
                p[8].innerText = '+';
            }
            p[8].innerText += (diff / 100).toFixed(2);
            p[9].innerText = res.balanceStr;
        }
        else {
            p[7].innerText = res.balanceStr;
        }
        balanceStr = res.balanceStr;
        balance = res.balance;
        localStorage.setItem('gift_balance_str', balanceStr);
        localStorage.setItem('gift_balance', balance);
        localStorage.setItem('gift_card', cardNo);
        localStorage.setItem('gift_pin', pinNo);
    }
    else if (res.message) {
        p[7].innerText = res.message;
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
    i.focus();
});