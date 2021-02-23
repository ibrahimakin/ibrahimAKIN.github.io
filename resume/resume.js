function readMoreFunction(event) {
    let dots = document.getElementById("more-courses-dots");
    let moreText = document.getElementById("more-courses");
    let btnMore = event.target;
    let btnLess = document.getElementById("read-less-courses");
  
    if (dots.style.display !== "none") {
        dots.style.display = "none";
        btnMore.style.display = 'none';
        btnLess.style.display = 'inline';
        moreText.style.display = "inline";
    }
}

function readLessFunction(event) {
    let dots = document.getElementById("more-courses-dots");
    let moreText = document.getElementById("more-courses");
    let btnLess = event.target;
    let btnMore = document.getElementById("read-more-courses");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnLess.style.display = 'none';
        btnMore.style.display = 'inline';
        moreText.style.display = "none";
    } 
}

function responsiveResume(x, onStart){
    let e = document.getElementById('resume-rightside');
    // let e = document.getElementById('education');
    if (x.matches) {
        if (onStart) {
            e.scrollIntoView({behavior: 'smooth'});
        }
        else {
            e.scrollIntoView(); // {behavior: 'smooth'}
        }
    }
}
let x = window.matchMedia('(max-width: 600px)');
responsiveResume(x);//, true) // Call listener function at run time
x.addEventListener('change', responsiveResume); // Attach listener function on state changes