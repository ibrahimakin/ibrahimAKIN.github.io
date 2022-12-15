class PersonalCard extends HTMLElement {
    constructor() {
        super();
    }
    handleOrientation(event, card) {
        let beta = event['beta'] % 360;
        let alpha = event['gamma'] % 360;
        if ((45 < beta && beta < 135) && (-45 < alpha && alpha < 45)) {
            card.style.transform = `rotateY(${-alpha}deg) rotateX(${beta - 90}deg)`;
        }
    }
    connectedCallback() {
        this.innerHTML = `
          <div id="content">
            <div class="container">
                <div class="card">
                    <div class="effects">
                        <div class="background"></div>
                        <div class="glow"></div>
                    </div>
                    <div class="photo">
                        <div class="circle"></div>
                        <div class="img"></div>
                    </div>
                    <div class="info">
                        <h1 class="title">ibrahim AKIN</h1>
                        <h3>Software Developer</h3>
                        <p>The best adjective that describes me is curious. I always want to learn new things
                            and search them to discover.<br/><br/>
                            Feel free to say hello through any of the social links below.<br/><br/>
                        </p>
                        <div class="links">
                          <social-icons></social-icons>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        `;
        // Movement Animation to happen
        const card = document.querySelector('.card');
        const container = document.querySelector('.container');

        // Items
        const background = document.querySelector('.effects .background');
        const circle = document.querySelector('.photo .circle');
        const photo = document.querySelector('.photo .img');
        const title = document.querySelector('.title');
        const description = document.querySelector('.info h3');
        const about = document.querySelector('.info p');
        const links = document.querySelector('.links');

        window.addEventListener('deviceorientation', e => this.handleOrientation(e, card));

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
            // Popout
            circle.style.transform = 'translateZ(55px)';
            photo.style.transform = 'translateZ(75px)';
            title.style.transform = 'translateZ(75px)';
            description.style.transform = 'translateZ(60px)';
            about.style.transform = 'translateZ(55px)';
            links.style.transform = 'translateZ(75px)';
        })

        // Animate Out
        container.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            // Popback
            circle.style.transform = 'translateZ(0px)';
            photo.style.transform = 'translateZ(0px)';
            title.style.transform = 'translateZ(0px)';
            description.style.transform = 'translateZ(0px)';
            about.style.transform = 'translateZ(0px)';
            links.style.transform = 'translateZ(0px)';
            background.style.transition = 'transform 0.5s ease, opacity .5s ease';
            background.style.transform = `translateX(0px) translateY(0px)`;
        });
        particlesJS('particles-js', particlesConfig);
    }
}
customElements.define('personal-card', PersonalCard);