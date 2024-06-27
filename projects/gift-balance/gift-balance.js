const URL = 'https://api.a101prod.retter.io/dbmk89vnr/';
let accessToken = localStorage.getItem('gift_access_token');
let refreshToken = localStorage.getItem('gift_refresh_token');
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

if (balance) {
    document.forms[0][2].nextElementSibling.innerText = 'Last Balance: ' + balance;
}

if (phone) {
    document.forms[1][0].value = phone;
}

async function asyncWrapper(e, callback) {
    e.preventDefault();
    if (loading) return;
    loading = true;
    await callback(e);
    loading = false;
}

async function checkBalance(cardNo, pinNo) {
    const pin = CryptoJS.MD5(pinNo).toString();
    const res = await fetch(URL + 'CALL/User/checkGiftCardBalance/qRob2mtm6SHFbgGGBTlJNW7l',
        { method: 'POST', body: JSON.stringify({ cardNo, pin, service: 'ECOM' }), headers: { Authorization: 'Bearer ' + accessToken } })
        .then(res => res.json());
    if (res.balance >= 0) {
        document.forms[0][2].nextElementSibling.innerText = res.balanceStr;
        localStorage.setItem('gift_balance', res.balanceStr);
        localStorage.setItem('gift_card', cardNo);
        localStorage.setItem('gift_pin', pinNo);
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
    if (!(res.balance >= 0)) {
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