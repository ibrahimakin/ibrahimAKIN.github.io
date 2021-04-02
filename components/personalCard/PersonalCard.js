class PersonalCard extends HTMLElement {
    constructor() {
      super();
    }
    handleOrientation(event, card) {
        let beta = event['beta'] % 360;
        let alpha = event['gamma'] % 360;
        if ((45 < beta && beta < 135) && (-45 < alpha && alpha < 45)) {
            card.style.transform = `rotateY(${-alpha}deg) rotateX(${beta-90}deg)`;
        }
    }
    connectedCallback() {
        this.innerHTML = `
          <div id="content">
            <div class="container">
                <div class="card">
                    <div id="particles-js"></div>
                    <div class="sneaker">
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
                        <div class="sizes">
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
        const particlesJs = document.querySelector('#particles-js');
        const circle = document.querySelector('.sneaker .circle');
        const sneaker = document.querySelector('.sneaker .img');
        const title = document.querySelector('.title');
        const description = document.querySelector('.info h3');
        const about = document.querySelector('.info p');
        const sizes = document.querySelector('.sizes');

        window.addEventListener('deviceorientation', (event)=>{this.handleOrientation(event, card)});

        // Moving Animation Event
        container.addEventListener('mousemove', (e) => {
            // console.log(e.pageX, e.pageY);
            let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
            let yAxis = -(window.innerHeight / 2 - e.pageY) / 20;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Animate In
        container.addEventListener('mouseenter', (e) => {
            card.style.transition = 'none';
            // Popout
            particlesJs.style.transform = 'translateZ(50px)';
            circle.style.transform = 'translateZ(55px)';
            sneaker.style.transform = 'translateZ(75px)';//rotateZ(-45deg)';
            title.style.transform = 'translateZ(75px)';
            description.style.transform = 'translateZ(60px)';
            about.style.transform = 'translateZ(55px)';
            sizes.style.transform = 'translateZ(75px)';
        })

        // Animate Out
        container.addEventListener('mouseleave', (e) => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            // Popback
            particlesJs.style.transform = 'translateZ(0px)'
            circle.style.transform = 'translateZ(0px)';
            sneaker.style.transform = 'translateZ(0px)';
            title.style.transform = 'translateZ(0px)';
            description.style.transform = 'translateZ(0px)';
            about.style.transform = 'translateZ(0px)';
            sizes.style.transform = 'translateZ(0px)';
        });
        particlesJS("particles-js", particlesConfig);
    }
}
customElements.define('personal-card', PersonalCard);