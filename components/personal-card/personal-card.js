// Movement Animation to happen
const card = document.querySelector('.card');
const container = document.querySelector('.container');

// Items
const background = document.querySelector('.effects .background');
const circle = document.querySelector('.circle');
const logo = document.querySelector('.logo');
const title = document.querySelector('.title');
const description = document.querySelector('.info h2');
const about = document.querySelector('.info p');
const links = document.querySelector('.links');

// Moving Animation Event
container.addEventListener('mousemove', e => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    let yAxis = -(window.innerHeight / 2 - e.pageY) / 20;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    background.style.transform = `translateX(${-xAxis * 8}px) translateY(${yAxis * 4}px)`;
});

// Animate In
container.addEventListener('mouseenter', () => {
    card.style.removeProperty('transition');
    background.style.removeProperty('transition');
    card.style.transition = 'none';
    // Popout
    circle.style.transform = 'translateZ(35px)';
    logo.style.transform = 'translateZ(50px)';
    title.style.transform = 'translateZ(75px)';
    description.style.transform = 'translateZ(60px)';
    about.style.transform = 'translateZ(55px)';
    links.style.transform = 'translateZ(75px)';
})

// Animate Out
container.addEventListener('mouseleave', () => {
    card.removeAttribute('style');
    // Popback
    circle.removeAttribute('style');
    logo.removeAttribute('style');
    title.removeAttribute('style');
    description.removeAttribute('style');
    about.removeAttribute('style');
    links.removeAttribute('style');
    background.style.transition = 'transform .5s ease, opacity .5s ease';
    background.style.removeProperty('transform');
});