function showMore(e) {
    let dots = document.getElementById('dots');
    let text = document.getElementById('more-courses');
    let less = e.nextElementSibling;
    less.style.display = 'inline';
    text.style.display = 'inline';
    dots.style.display = 'none';
    e.style.display = 'none';
}

function showLess(e) {
    let dots = document.getElementById('dots');
    let text = document.getElementById('more-courses');
    let more = e.previousElementSibling;
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