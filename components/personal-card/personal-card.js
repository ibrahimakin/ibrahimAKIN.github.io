class PersonalCard extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `
            <div id="content">
                <div class="container">
                    <div class="card">
                        <div class="effects">
                            <div class="background"></div>
                            <div class="glow"></div>
                        </div>
                        <div>
                            <div class="circle">
                                <div class="logo">
                                    <div class="i">
                                        <div class="box">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <svg width="15" height="18" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="50" height="60" />
                                            </svg>
                                        </div>
                                        <div class="box">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <svg width="15" height="60" viewBox="0 0 50 200" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="50" height="200" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="a">
                                        <div class="box">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <svg width="15" height="75" viewBox="0 0 50 250" xmlns="http://www.w3.org/2000/svg">
                                                <polygon points="0,250 0,50 50,0 50,250" />
                                            </svg>
                                        </div>
                                        <div class="box">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <svg width="40" height="15" viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg">
                                                <polygon points="0,60 30,0 160,0 160,60" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info">
                            <h1 class="title">ibrahim AKIN</h1>
                            <h2 lang-tag="profession">Software Engineer</h2>
                            <p>
                                <span lang-tag="description">
                                    The trait that best describes me is a strong commitment to continuous learning. I have a strong desire to learn new things and explore them to gain deeper insights.
                                </span><br/><br/>
                                <span lang-tag="contact">
                                    Feel free to say hello through any of the social links below.
                                </span>
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
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            // Popback
            circle.style.transform = 'translateZ(0px)';
            logo.style.transform = 'translateZ(0px)';
            title.style.transform = 'translateZ(0px)';
            description.style.transform = 'translateZ(0px)';
            about.style.transform = 'translateZ(0px)';
            links.style.transform = 'translateZ(0px)';
            background.style.transition = 'transform 0.5s ease, opacity .5s ease';
            background.style.transform = `translateX(0px) translateY(0px)`;
        });
    }
}
customElements.define('personal-card', PersonalCard);