function showMore(e) {
    const dots = document.getElementById('dots');
    const text = document.getElementById('more-courses');
    const less = e.nextElementSibling;
    less.style.display = 'inline';
    text.style.display = 'inline';
    dots.style.display = 'none';
    e.style.display = 'none';
}

function showLess(e) {
    const dots = document.getElementById('dots');
    const text = document.getElementById('more-courses');
    const more = e.previousElementSibling;
    dots.style.display = 'inline';
    more.style.display = 'inline';
    text.style.display = 'none';
    e.style.display = 'none';
}

let target, timeout;
for (const el of document.querySelectorAll('a[href^="#"]')) {
    el.addEventListener('click', e => {
        clearTimeout(timeout);
        if (target) target.removeAttribute('class');
        const id = e.currentTarget.getAttribute('href');
        target = document.querySelector(id);
        target.classList.add('focus');
        timeout = setTimeout(() => target.removeAttribute('class'), 2100);
    });
}