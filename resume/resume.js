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