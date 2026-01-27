let target, timeout;
for (const el of document.querySelectorAll('a[href^="#"]')) {
    el.addEventListener('click', e => {
        clearTimeout(timeout);
        if (target) target.removeAttribute('class');
        const id = e.currentTarget.getAttribute('href');
        target = document.querySelector(id + '+h3');
        target.classList.add('focus');
        timeout = setTimeout(() => target.removeAttribute('class'), 2100);
    });
}