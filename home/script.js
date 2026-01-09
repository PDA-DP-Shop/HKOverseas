// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;

        // Outline follows with lag
        cursorOutline.animate({
            transform: `translate(${posX}px, ${posY}px) translate(-50%, -50%)`
        }, { duration: 500, fill: "forwards" });
    });
}

// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    const progressCircle = document.querySelector('.loader-progress');
    const percentText = document.querySelector('.loader-percent');

    // Remove scrolling during load
    document.body.style.overflow = 'hidden';

    // 1. Circle & Text Animation
    tl.to(progressCircle, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut"
    })
        .to(percentText, {
            innerText: 100,
            duration: 1.5,
            snap: { innerText: 1 },
            ease: "linear",
            onUpdate: function () {
                this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerText) + "%";
            }
        }, "<") // Start at same time as circle

        // 2. Preloader Exit
        .to('.loader-design', {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "back.in(1.7)"
        })
        .to('.preloader', {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut",
            onComplete: () => {
                document.body.style.overflow = ''; // Re-enable scroll
            }
        })

        // 3. Hero Entrance
        .from('.hero-bg', {
            scale: 1.2,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        .from('.hero-title .word', {
            y: '110%',
            duration: 1,
            stagger: 0.05,
            ease: "power4.out"
        }, "-=1")
        .from('.fade-up', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.8");
});

// Scroll Triggers
// About Image Reveal
gsap.from('.reveal-image', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
});

// Text Reveals
gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Service Cards Stagger
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '#services',
        start: 'top 75%'
    },
    y: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out"
});

// Stats Counter
const stats = document.querySelectorAll('.counter');
stats.forEach(counter => {
    const target = +counter.getAttribute('data-target');

    ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        }
    });
});

// Parallax Effect for Hero Image
gsap.to('.parallax-img', {
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 100
});

// Navbar Scroll Logic (Hide/Show)
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add 'scrolled' class for background style
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/Show Logic
    // If scrolling DOWN and past threshold -> Hide
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('navbar-hidden');
    }
    // If scrolling UP -> Show
    else {
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle logic
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('active');

        // Optional: Body scroll lock
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}
