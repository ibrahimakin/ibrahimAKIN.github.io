function readMore(e) {
    let dots = document.getElementById('more-courses-dots');
    let moreText = document.getElementById('more-courses');
    let btnLess = document.getElementById('read-less-courses');

    if (dots.style.display !== 'none') {
        dots.style.display = 'none';
        e.target.style.display = 'none';
        btnLess.style.display = 'inline';
        moreText.style.display = 'inline';
    }
}

function readLess(e) {
    let dots = document.getElementById('more-courses-dots');
    let moreText = document.getElementById('more-courses');
    let btnMore = document.getElementById('read-more-courses');

    if (dots.style.display === 'none') {
        dots.style.display = 'inline';
        e.target.style.display = 'none';
        btnMore.style.display = 'inline';
        moreText.style.display = 'none';
    }
}

function responsiveResume(x, onStart) {
    let e = document.getElementById('resume-rightside');
    if (x.matches) {
        if (onStart) e.scrollIntoView({ behavior: 'smooth' });
        else e.scrollIntoView();
    }
}
let x = window.matchMedia('(max-width: 600px)');
responsiveResume(x);                            // Call listener function at run time
x.addEventListener('change', responsiveResume); // Attach listener function on state changes