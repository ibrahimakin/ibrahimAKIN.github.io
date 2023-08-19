const particles_config = {
    particles: {
        number: {
            value: 125,
            density: {
                enable: true,
                value_area: 1700
            }
        },
        color: {
            value: '#fff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000'
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: .5,
            random: false,
            anim: {
                enable: false,
                speed: .1,
                opacity_min: .1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 10,
                size_min: .1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#fff',
            opacity: .4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: false,
                mode: 'grab'
            },
            onclick: {
                enable: false,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: .4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};
particlesJS('particles-js', particles_config);